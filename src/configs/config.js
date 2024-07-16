const CLASS = {
    // stories
    0:{
        'colour': '#5884a7',
        'text': 'My Past Stories',
        'type': 'stories',
    },

    // awards
    1: {
        'colour': '#e55441',
        'text': 'My Past Feats',
        'type': 'awards',
    },

    // projects
    2: {
        'colour': '#1f9a6d',
        'text': 'My Past Projects',
        'type': 'projects'
    }
}

const base_asset_URL = 'https://raw.githubusercontent.com/PranavJoshi-STEM/PranavJoshi-stem.github.io/main/';
const github_API_URL = 'https://api.github.com/repos/pranavjoshi-stem/pranavjoshi-stem.github.io/contents/src/';


export { CLASS, base_asset_URL, github_API_URL };