document.getElementById('readmeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Retrieve form values
    const name = document.getElementById('name').value;
    const aboutme = document.getElementById('aboutme').value;
    const leetcodeUrl = document.getElementById('leetcode').value.trim();
    const codechefUrl = document.getElementById('codechef').value.trim();
    

    // Generate Markdown
    const markdown = `

<h1 align="center">
  ${name}
</h1>
👋 Hi there! I'm **${name}**,${aboutme} 


## 🌐 Socials

`;

if (instagramUsername) {
        markdown += `[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/${instagramUsername})\n`;
    }

if (twitterUsername) {
        markdown += `[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?logo=Twitter&logoColor=white)](https://x.com/${twitterUsername})\n`;
    }

if (linkedinUrl) {
        markdown += `[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/${linkedinUrl})\n`;
    }

    markdown += `
## 📊 GitHub Stats

![](https://github-readme-stats.vercel.app/api?username=verappansm&theme=tokyonight&hide_border=false&include_all_commits=true&count_private=true)<br/>
![](https://github-readme-streak-stats.herokuapp.com/?user=verappansm&theme=tokyonight&hide_border=false)<br/>
![](https://github-readme-stats.vercel.app/api/top-langs/?username=verappansm&theme=tokyonight&hide_border=false&include_all_commits=true&count_private=true&layout=compact)
`;

    // Display generated Markdown
    document.getElementById('readmeOutput').innerText = markdown;
});
