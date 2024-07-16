import { github_API_URL } from '../configs/config.js';
import axios from 'axios';


// Function to extract details of the input string in the format 'DD_MM_YYYY'
const extract_date = (text) => {
    // Split the input text by underscore to separate month, day, and year
    const parts = text.split('_');
    if (parts.length !== 3) {
        throw new Error('Invalid date format. Please use DD_MM_YYYY format.');
    }

    // Extract month, day, and year from the parts
    const day = parseInt(parts[0]);
    const month_int = parseInt(parts[1], 10) - 1; // Adjust for array index (0-11)
    const year = parseInt(parts[2]);

    // Array of month names for converting month integer to string
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Construct the date object with the extracted details
    const date = {
        'year': year,
        'month_int': month_int + 1,
        'month_str': months[month_int],
        'month_short_str': months[month_int].substring(0, 3),
        'day': day
    };

    return date;
}


const find_all_dates = async (type) => {
    let dir = ['stories', 'awards', 'projects'][type];
    console.log('Reading directory:', dir);

    try {
        // Make a GET request to GitHub API
        // Note: Don't put slash because that somehow messes up the URL
        const response = await axios.get(`${github_API_URL}${dir}/`);

        // Extract file names from the response
        const fileNames = response.data.map(file => file.name);

        // Filter files based on the format 'DD_MM_YYYY.js'
        const filteredFiles = fileNames.filter(fileName => {
            if (fileName === '0_find.md') {
                return false; // Exclude '0_find.md'
            }
            const regex = /^\d{2}_\d{2}_\d{4}\.js$/; // Matches 'DD_MM_YYYY.js' format
            return regex.test(fileName);
        });

        // Prepare a dictionary to store posts by year in reverse chronological order
        const postsByYear = {};

        // Populate postsByYear dictionary
        filteredFiles.forEach(fileName => {
            const date = extract_date(fileName.replace('.js', ''));
            const year = date.year;

            if (!postsByYear[year]) {
                postsByYear[year] = [];
            }
            postsByYear[year].push(fileName);
        });

        // Sort posts within each year in reverse chronological order
        Object.keys(postsByYear).forEach(year => {
            postsByYear[year].sort((a, b) => {
                const dateA = extract_date(a.replace('.js', ''));
                const dateB = extract_date(b.replace('.js', ''));
                const numDateA = parseInt(`${dateA.year}${dateA.month}${dateA.day}`, 10);
                const numDateB = parseInt(`${dateB.year}${dateB.month}${dateB.day}`, 10);
                return numDateB - numDateA;
            });
        });

        // Prepare the final response array in reverse chronological order by year
        const finalResponse = Object.keys(postsByYear)
            .sort((a, b) => b - a) // Sort years in reverse chronological order
            .map(year => ({
                year: year,
                posts: postsByYear[year]
            }));

        return finalResponse;
    } catch (error) {
        console.error('Error fetching file names:', error);
        return [];
    }
};


export { extract_date, find_all_dates };