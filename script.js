const sidebarToggle=document.querySelector('.sidebar-toggle');
        const sidebar=document.querySelector('.sidebar');
        const sidebarLinks=document.querySelectorAll('.sidebar a');
        const sections=document.querySelectorAll('main section');
        const themeToggle=document.getElementById('theme-toggle');
        const body=document.body;

        sidebarToggle.addEventListener('click',()=>sidebar.classList.toggle('open'));

        document.addEventListener('click',e=>{
            if(window.innerWidth<=1024 && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)){
                sidebar.classList.remove('open');
            }
        });

        function updateActiveSection(){
            const pos=window.scrollY+100;
            sections.forEach(sec=>{
                if(pos>=sec.offsetTop && pos<sec.offsetTop+sec.offsetHeight){
                    sidebarLinks.forEach(l=>l.classList.remove('active'));
                    document.querySelector(`[data-section="${sec.id}"]`).classList.add('active');
                }
            });
        }
        window.addEventListener('scroll',updateActiveSection);

        sidebarLinks.forEach(link=>{
            link.addEventListener('click',e=>{
                e.preventDefault();
                document.getElementById(link.getAttribute('href').substring(1)).scrollIntoView({behavior:'smooth'});
                if(window.innerWidth<=1024) sidebar.classList.remove('open');
            });
        });
    
        themeToggle.addEventListener('click',()=>{
            body.classList.toggle('dark-theme');
            themeToggle.textContent=body.classList.contains('dark-theme')?'☀ Light Mode':'🌙 Dark Mode';
        });
  
        document.querySelectorAll('.copy-btn').forEach(btn=>{
            btn.addEventListener('click',()=>{
                navigator.clipboard.writeText(btn.nextElementSibling.textContent);
                btn.textContent='Copied!';
                setTimeout(()=>btn.textContent='Copy',2000);
            });
        });
        updateActiveSection();