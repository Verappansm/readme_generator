const TECH_STACK = [
    // Languages
    { id: 'js', name: 'JavaScript', category: 'Languages', icon: 'javascript' },
    { id: 'ts', name: 'TypeScript', category: 'Languages', icon: 'typescript' },
    { id: 'python', name: 'Python', category: 'Languages', icon: 'python' },
    { id: 'java', name: 'Java', category: 'Languages', icon: 'java' },
    { id: 'cpp', name: 'C++', category: 'Languages', icon: 'cplusplus' },
    { id: 'csharp', name: 'C#', category: 'Languages', icon: 'csharp' },
    { id: 'go', name: 'Go', category: 'Languages', icon: 'go' },
    { id: 'rust', name: 'Rust', category: 'Languages', icon: 'rust' },
    { id: 'php', name: 'PHP', category: 'Languages', icon: 'php' },
    { id: 'ruby', name: 'Ruby', category: 'Languages', icon: 'ruby' },
    { id: 'swift', name: 'Swift', category: 'Languages', icon: 'swift' },
    { id: 'kotlin', name: 'Kotlin', category: 'Languages', icon: 'kotlin' },
    { id: 'dart', name: 'Dart', category: 'Languages', icon: 'dart' },

    // Frontend
    { id: 'react', name: 'React', category: 'Frontend', icon: 'react' },
    { id: 'nextjs', name: 'Next.js', category: 'Frontend', icon: 'nextjs' },
    { id: 'vue', name: 'Vue.js', category: 'Frontend', icon: 'vuejs' },
    { id: 'angular', name: 'Angular', category: 'Frontend', icon: 'angularjs' },
    { id: 'svelte', name: 'Svelte', category: 'Frontend', icon: 'svelte' },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', icon: 'tailwindcss' },
    { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend', icon: 'bootstrap' },
    { id: 'sass', name: 'Sass', category: 'Frontend', icon: 'sass' },
    { id: 'html5', name: 'HTML5', category: 'Frontend', icon: 'html5' },
    { id: 'css3', name: 'CSS3', category: 'Frontend', icon: 'css3' },

    // Backend / API
    { id: 'nodejs', name: 'Node.js', category: 'Backend/API', icon: 'nodejs' },
    { id: 'express', name: 'Express', category: 'Backend/API', icon: 'express' },
    { id: 'django', name: 'Django', category: 'Backend/API', icon: 'django' },
    { id: 'flask', name: 'Flask', category: 'Backend/API', icon: 'flask' },
    { id: 'spring', name: 'Spring', category: 'Backend/API', icon: 'spring' },
    { id: 'laravel', name: 'Laravel', category: 'Backend/API', icon: 'laravel' },
    { id: 'dotnet', name: '.NET', category: 'Backend/API', icon: 'dot-net' },

    // Database / Cache
    { id: 'postgresql', name: 'PostgreSQL', category: 'Database/Cache', icon: 'postgresql' },
    { id: 'mysql', name: 'MySQL', category: 'Database/Cache', icon: 'mysql' },
    { id: 'mongodb', name: 'MongoDB', category: 'Database/Cache', icon: 'mongodb' },
    { id: 'redis', name: 'Redis', category: 'Database/Cache', icon: 'redis' },
    { id: 'supabase', name: 'Supabase', category: 'Database/Cache', icon: 'supabase' },
    { id: 'firebase', name: 'Firebase', category: 'Database/Cache', icon: 'firebase' },

    // Cloud / DevOps
    { id: 'azure', name: 'Azure', category: 'Cloud/DevOps', icon: 'azure' },
    { id: 'gcp', name: 'Google Cloud', category: 'Cloud/DevOps', icon: 'googlecloud' },
    { id: 'docker', name: 'Docker', category: 'Cloud/DevOps', icon: 'docker' },
    { id: 'kubernetes', name: 'Kubernetes', category: 'Cloud/DevOps', icon: 'kubernetes' },
    { id: 'git', name: 'Git', category: 'Cloud/DevOps', icon: 'git' },

    // Other Tools
    { id: 'figma', name: 'Figma', category: 'Other Tools', icon: 'figma' },
    { id: 'postman', name: 'Postman', category: 'Other Tools', icon: 'postman' },
    { id: 'visualstudiocode', name: 'VS Code', category: 'Other Tools', icon: 'vscode' },
    { id: 'linux', name: 'Linux', category: 'Other Tools', icon: 'linux' }
];

let state = {
    name: '',
    tagline: '',
    work_project: '', work_link: '',
    collab_project: '', collab_link: '',
    help_project: '', help_link: '',
    learning: '',
    askme: '',
    reachme: '',
    projects_url: '',
    blog_url: '',
    resume_url: '',
    funfact: '',
    github: '',
    theme: 'tokyonight',
    stats: { profile: true, topLang: true, streak: true },
    addons: {
        visitors: false,
        trophy: false,
        stats: false,
        skills: false,
        streak: false,
        twitter: false,
        blog_devto: false,
        blog_medium: false
    },
    socials: {
        twitter: '', linkedin: '', instagram: '',
        stackoverflow: '', medium: '',
        kaggle: '', youtube_user: '', leetcode: '', codechef: '',
        codeforces: '', hackerrank: '', discord: '', quora: ''
    },
    selectedTech: new Set(),
    activeTab: 'preview',
    searchQuery: ''
};

function init() {
    renderTechStack();
    setupEventListeners();
    updateOutput();
}

function renderTechStack() {
    const container = document.getElementById('techStackContainer');
    container.innerHTML = '';
    const categories = [...new Set(TECH_STACK.map(item => item.category))];
    categories.forEach(cat => {
        const filteredTech = TECH_STACK.filter(tech => tech.category === cat && tech.name.toLowerCase().includes(state.searchQuery.toLowerCase()));
        if (filteredTech.length === 0) return;
        const catSection = document.createElement('div');
        catSection.className = 'tech-category';
        catSection.innerHTML = `<h3>${cat}</h3><div class="tech-grid"></div>`;
        const grid = catSection.querySelector('.tech-grid');
        filteredTech.forEach(tech => {
            const item = document.createElement('div');
            item.className = `tech-item ${state.selectedTech.has(tech.id) ? 'selected' : ''}`;
            let iconUrl = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${tech.icon}/${tech.icon}-original.svg`;
            if (tech.id === 'amazonaws') iconUrl = `https://cdn.simpleicons.org/amazonaws/white`;
            item.innerHTML = `<img src="${iconUrl}" onerror="this.src='https://cdn.simpleicons.org/${tech.id}/white'" alt="${tech.name}"><span>${tech.name}</span>`;
            item.onclick = () => toggleTech(tech.id);
            grid.appendChild(item);
        });
        container.appendChild(catSection);
    });
}

function toggleTech(id) {
    if (state.selectedTech.has(id)) state.selectedTech.delete(id);
    else state.selectedTech.add(id);
    renderTechStack();
    updateOutput();
}

function setupEventListeners() {
    const basicInputs = ['name', 'tagline', 'work_project', 'work_link', 'collab_project', 'collab_link', 'help_project', 'help_link', 'learning', 'askme', 'reachme', 'projects_url', 'blog_url', 'resume_url', 'funfact', 'github', 'theme'];
    basicInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', (e) => { state[id] = e.target.value; updateOutput(); });
    });

    const checkboxes = ['profile_stats', 'top_lang', 'streak'];
    checkboxes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', (e) => {
            if (id === 'profile_stats') state.stats.profile = e.target.checked;
            if (id === 'top_lang') state.stats.topLang = e.target.checked;
            if (id === 'streak') state.stats.streak = e.target.checked;
            updateOutput();
        });
    });

    const addons = ['visitors', 'trophy', 'stats', 'skills', 'streak', 'twitter', 'blog_devto', 'blog_medium'];
    addons.forEach(id => {
        const el = document.getElementById(`addon_${id}`);
        if (el) el.addEventListener('change', (e) => { state.addons[id] = e.target.checked; updateOutput(); });
    });

    const socials = ['twitter', 'linkedin', 'instagram', 'devto', 'codepen', 'codesandbox', 'stackoverflow', 'medium', 'kaggle', 'youtube_user', 'leetcode', 'codechef', 'codeforces', 'hackerrank', 'discord', 'quora', 'rss'];
    socials.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', (e) => { state.socials[id] = e.target.value; updateOutput(); });
    });

    const toggleBtn = document.getElementById('togglePreview');
    if (toggleBtn) toggleBtn.addEventListener('click', () => {
        const app = document.getElementById('app');
        app.classList.toggle('preview-hidden');
        toggleBtn.textContent = app.classList.contains('preview-hidden') ? 'View Preview' : 'Close Preview';
    });

    const searchInput = document.getElementById('skillsSearch');
    if (searchInput) searchInput.addEventListener('input', (e) => { state.searchQuery = e.target.value; renderTechStack(); });

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            state.activeTab = tab.dataset.tab;
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('previewPane').style.display = state.activeTab === 'preview' ? 'block' : 'none';
            document.getElementById('codePane').style.display = state.activeTab === 'code' ? 'block' : 'none';
        });
    });

    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) copyBtn.addEventListener('click', () => {
        const code = generateMarkdown();
        navigator.clipboard.writeText(code);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy Code', 2000);
    });
}

function generateMarkdown() {
    let md = `# Hi 👋, I'm ${state.name || 'Your Name'}\n`;
    md += `### ${state.tagline || 'A passionate developer from India'}\n\n`;

    if (state.addons.visitors && state.github) {
        md += `![Visitors](https://visitor-badge.laobi.icu/badge?page_id=${state.github}.${state.github})\n\n`;
    }

    let aboutMd = '';
    if (state.work_project) aboutMd += `- 🔭 I’m currently working on [${state.work_project}](${state.work_link || '#'})\n`;
    if (state.learning) aboutMd += `- 🌱 I’m currently learning **${state.learning}**\n`;
    if (state.collab_project) aboutMd += `- 👯 I’m looking to collaborate on [${state.collab_project}](${state.collab_link || '#'})\n`;
    if (state.help_project) aboutMd += `- 🤝 I’m looking for help with [${state.help_project}](${state.help_link || '#'})\n`;
    if (state.askme) aboutMd += `- 💬 Ask me about **${state.askme}**\n`;
    if (state.reachme) aboutMd += `- 📫 How to reach me **${state.reachme}**\n`;
    if (state.projects_url) aboutMd += `- 👨‍💻 All of my projects are available at [${state.projects_url}](${state.projects_url})\n`;
    if (state.blog_url) aboutMd += `- 📝 I regularly write articles on [${state.blog_url}](${state.blog_url})\n`;
    if (state.resume_url) aboutMd += `- 📄 Know about my experiences [${state.resume_url}](${state.resume_url})\n`;
    if (state.funfact) aboutMd += `- ⚡ Fun fact **${state.funfact}**\n`;
    if (aboutMd) md += aboutMd + '\n';

    if (state.addons.trophy && state.github) {
        md += `### Trophies\n[![trophy](https://github-profile-trophy.vercel.app/?username=${state.github})](https://github.com/ryo-ma/github-profile-trophy)\n\n`;
    }

    if (state.selectedTech.size > 0) {
        md += `### Languages and Tools:\n\n<p align="left"> `;
        state.selectedTech.forEach(id => {
            const tech = TECH_STACK.find(t => t.id === id);
            if (tech) {
                let iconUrl = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${tech.icon}/${tech.icon}-original.svg`;
                if (tech.id === 'amazonaws') iconUrl = `https://cdn.simpleicons.org/amazonaws/white`;
                md += `<a href="#" target="_blank" rel="noreferrer"> <img src="${iconUrl}" onerror="this.src='https://cdn.simpleicons.org/${tech.id}/white'" alt="${tech.id}" width="40" height="40"/> </a> `;
            }
        });
        md += `</p>\n\n`;
    }

    if (state.github && (state.stats.profile || state.stats.topLang || state.stats.streak)) {
        md += `### GitHub Stats:\n\n<p align="center">\n`;
        if (state.stats.profile) md += `  <img src="https://github-readme-stats.vercel.app/api?username=${state.github}&show_icons=true&theme=${state.theme}" alt="Stats" />\n`;
        if (state.stats.topLang) md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${state.github}&layout=compact&theme=${state.theme}" alt="Top Languages" />\n`;
        if (state.stats.streak) md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${state.github}&theme=${state.theme}" alt="Streak" />\n`;
        md += `</p>\n\n`;
    }

    if (Object.values(state.socials).some(v => v)) {
        md += `### Connect with me:\n\n<p align="left">\n`;
        for (const [platform, user] of Object.entries(state.socials)) {
            if (user) {
                const urlMap = {
                    twitter: `https://twitter.com/${user}`,
                    linkedin: `https://linkedin.com/in/${user}`,
                    instagram: `https://instagram.com/${user}`,
                    devto: `https://dev.to/${user}`,
                    codepen: `https://codepen.io/${user}`,
                    codesandbox: `https://codesandbox.io/u/${user}`,
                    stackoverflow: `https://stackoverflow.com/users/${user}`,
                    medium: `https://medium.com/@${user}`,
                    kaggle: `https://kaggle.com/${user}`,
                    youtube_user: `https://youtube.com/${user}`,
                    leetcode: `https://leetcode.com/${user}`,
                    codechef: `https://codechef.com/users/${user}`,
                    codeforces: `https://codeforces.com/profile/${user}`,
                    hackerrank: `https://hackerrank.com/${user}`,
                    discord: `https://discord.gg/${user}`,
                    quora: `https://quora.com/profile/${user}`,
                    rss: user
                };
                md += `<a href="${urlMap[platform]}" target="blank"><img src="https://img.shields.io/badge/${platform}-%231E3233.svg?style=for-the-badge&logo=${platform}&logoColor=white" alt="${platform}" /></a>\n`;
            }
        }
        md += `</p>\n\n`;
    }

    if (state.addons.blog_devto && state.socials.devto) {
        md += `### Latest Dev.to Blogs\n<!-- DEV-TO-BLOGS:START -->\n<!-- DEV-TO-BLOGS:END -->\n\n`;
    }
    if (state.addons.blog_medium && state.socials.medium) {
        md += `### Latest Medium Blogs\n<!-- MEDIUM-BLOGS:START -->\n<!-- MEDIUM-BLOGS:END -->\n\n`;
    }

    return md;
}

function updateOutput() {
    const md = generateMarkdown();
    const codePane = document.getElementById('markdownOutput');
    if (codePane) codePane.textContent = md;
    const html = md.replace(/\n/g, '<br>').replace(/### (.*)/g, '<h3>$1</h3>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/# (.*)/g, '<h1>$1</h1>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const previewPane = document.getElementById('previewPane');
    if (previewPane) previewPane.innerHTML = html;
}

init();
