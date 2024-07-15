import fs from 'fs-web';

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


// Find all the dates in a class
const find_all_dates = async (type) => {
    let dir;
    switch (type) {
        case 0:
            dir = './stories/';
            break;
        case 1:
            dir = './awards/';
            break;
        case 2:
            dir = './projects/';
            break;
        default:
            return [];
    }
    console.log('reading directory:', dir);

    try {
        // Using fs-web to read the directory
        const files = await fs.readdir(dir);
        console.log(files);
        return files; // Returns an array of file names in the specified directory
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
};


export { extract_date, find_all_dates };