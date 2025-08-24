/* Right For You — Pure JS demo (localStorage only) */
const RFY = (() => {
  const $ = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));
  const page = document.body.getAttribute('data-page');
  const YEAR = new Date().getFullYear();
  const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = YEAR;

  // Mobile menu toggle (home)
  const ham = document.getElementById('hamburger');
  if (ham) {
    ham.addEventListener('click', () => {
      const nav = document.querySelector('.nav-links');
      if (!nav) return;
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.background = '#fff';
      nav.style.position = 'absolute';
      nav.style.top = '60px';
      nav.style.right = '12px';
      nav.style.padding = '12px';
      nav.style.boxShadow = '0 12px 28px rgba(2,6,23,.12)';
      nav.style.borderRadius = '12px';
      nav.style.gap = '10px';
    });
  }

  // ---- Colleges (Pune) ----
  const COLLEGES = [
    "COEP Technological University (COEP)",
    "MIT World Peace University (MIT-WPU)",
    "Pune Institute of Computer Technology (PICT)",
    "Vishwakarma Institute of Technology (VIT Pune)",
    "Pimpri Chinchwad College of Engineering (PCCOE)",
    "Sinhgad College of Engineering (SCOE Vadgaon)",
    "Dr. D. Y. Patil College of Engineering, Akurdi",
    "Army Institute of Technology (AIT)",
    "Zeal College of Engineering and Research (ZCOER)",
    "Bharati Vidyapeeth College of Engineering, Pune",
    "Bharati Vidyapeeth Deemed University (BVU)",
    "Cummins College of Engineering for Women",
    "Modern Education Society's College of Engineering (MESCOE)",
    "PES Modern College of Engineering (MCOE)",
    "Marathwada Mitra Mandal's College of Engineering (MMCOE)",
    "AISSMS College of Engineering",
    "AISSMS Institute of Information Technology (IOIT)",
    "Indira College of Engineering and Management",
    "JSPM's Rajarshi Shahu College of Engineering (RSCOE)",
    "JSPM's Narhe Technical Campus (NTC)",
    "Sinhgad Institute of Technology (SIT Lonavala)",
    "Sinhgad Academy of Engineering (SAE Kondhwa)",
    "Trinity College of Engineering and Research",
    "DY Patil Institute of Engineering, Management & Research (DYPIEMR)",
    "DY Patil Institute of Technology (DPIT Pimpri)",
    "MIT Academy of Engineering (MITAOE, Alandi)",
    "MIT College of Engineering (old name)",
    "Symbiosis Institute of Technology (SIT)",
    "ISB&M College of Engineering",
    "Alard College of Engineering and Management",
    "PCET's NMIET",
    "Genba Sopanrao Moze College of Engineering (GSMCOE)",
    "G. H. Raisoni College of Engineering and Management (GHRCEM)",
    "Jayawantrao Sawant College of Engineering (JSCOE)",
    "Dhole Patil College of Engineering (DPCOE)",
    "Smt. Kashibai Navale College of Engineering (SKNCOE)",
    "SKN Sinhgad Institute of Technology & Science (SKN SIT&Sc)",
    "Sir Visvesvaraya Institute of Technology (SVIT Nashik Road – in region)",
    "Navsahyadri Group of Institutes (NGI)",
    "Sinhgad Institute of Business Administration & Computer Application (SIBACA)",
    "MIT-WPU School of Computer Science",
    "MIT-WPU School of Mechanical Engineering",
    "MIT-WPU School of Civil Engineering",
    "MIT-WPU School of E&TC",
    "VIT Pune School of Computer Engineering",
    "VIT Pune School of Mechanical & Automation",
    "COEP Department of Computer Engineering",
    "COEP Department of Mechanical Engineering",
    "COEP Department of E&TC",
    "PICT Computer Engineering",
    "PICT IT",
    "PICT E&TC",
    "PCCOE Computer Engineering",
    "PCCOE IT",
    "PCCOE E&TC",
    "AIT Computer Engineering",
    "AIT IT",
    "AIT E&TC",
    "MMCOE Computer Engineering",
    "MESCOE Computer Engineering",
    "MCOE Computer Engineering",
    "MCOE IT",
    "Cummins CSE",
    "Cummins E&TC",
    "DY Patil Akurdi Computer",
    "DY Patil Akurdi IT",
    "DY Patil Pimpri Computer",
    "Ajeenkya DY Patil University (ADYPU)",
    "Symbiosis International University",
    "Flame University (Pune)",
    "Fergusson College (Autonomous)",
    "SPPU (Savitribai Phule Pune University)"
  ];

  function populateColleges() {
    const dl = document.getElementById('puneColleges');
    if (!dl) return;
    dl.innerHTML = '';
    COLLEGES.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      dl.appendChild(opt);
    });
  }

  // ---- Demo store ----
  const store = {
    get(key, def){ try{ return JSON.parse(localStorage.getItem(key)) ?? def; }catch{ return def; } },
    set(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
  };

  // Initialize demo assignments if empty
  function seed() {
    const seeded = store.get('rfy_seeded', false);
    if (seeded) return;
    const demo = [
      { id: uid(), title:"DBMS Mini Project", desc:"ERD + SQL script", deadline:addDays(5), writer:"Writer A", college:"COEP", status:"Pending", payment:"Half Paid", created:Date.now() },
      { id: uid(), title:"Java OOP Report", desc:"UML & code snippets", deadline:addDays(3), writer:"Writer B", college:"MIT-WPU", status:"In Progress", payment:"Half Paid", created:Date.now() },
      { id: uid(), title:"AI Seminar Writeup", desc:"8-10 pages + refs", deadline:addDays(9), writer:"Writer C", college:"Zeal", status:"Completed", payment:"Fully Paid", created:Date.now() }
    ];
    store.set('rfy_assignments', demo);
    store.set('rfy_seeded', true);
  }

  function uid(){ return Math.random().toString(36).slice(2) + Date.now().toString(36); }
  function addDays(n){ const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); }

  // Signup
  function signup(e){
    e.preventDefault();
    const name = $('#su_name').value.trim();
    const role = $('#su_role').value;
    const email = $('#su_email').value.trim();
    const college = $('#su_college').value.trim();
    store.set('rfy_user', {name, role, email, college});
    if(role==='student') location.href='student.html';
    else if(role==='writer') location.href='writer.html';
    else location.href='admin.html';
    return false;
  }

  // Contact message (demo)
  function contactMessage(e){
    e.preventDefault();
    alert("Thanks! We’ll get back to you at your email.");
    e.target.reset();
    return false;
  }

  // ---- Student page logic ----
  function createAssignment(e){
    e.preventDefault();
    const a = {
      id: uid(),
      title: $('#a_title').value.trim(),
      deadline: $('#a_deadline').value,
      desc: $('#a_desc').value.trim(),
      college: $('#a_college').value.trim(),
      writer: $('#a_writer').value,
      status: 'Pending',
      payment: 'Half Paid',
      created: Date.now()
    };
    const list = store.get('rfy_assignments', []);
    list.unshift(a);
    store.set('rfy_assignments', list);
    e.target.reset();
    renderStudentStats();
    renderStudentList();
    alert("Assignment posted! 50% payment recorded (demo).");
    return false;
  }

  function renderStudentStats(){
    const list = store.get('rfy_assignments', []);
    $('#s_total') && ($('#s_total').textContent = list.length);
    $('#s_pending') && ($('#s_pending').textContent = list.filter(x=>x.status==='Pending').length);
    $('#s_progress') && ($('#s_progress').textContent = list.filter(x=>x.status==='In Progress').length);
    $('#s_completed') && ($('#s_completed').textContent = list.filter(x=>x.status==='Completed').length);
  }

  function renderStudentList(){
    const listEl = $('#studentList');
    if(!listEl) return;
    const q = ($('#s_search')?.value||'').toLowerCase();
    const fs = $('#s_status')?.value || '';
    const fp = $('#s_payment')?.value || '';
    const list = store.get('rfy_assignments', [])
      .filter(a => (a.title.toLowerCase().includes(q) || a.writer.toLowerCase().includes(q)))
      .filter(a => (fs? a.status===fs : true))
      .filter(a => (fp? a.payment===fp : true));

    listEl.innerHTML = '';
    list.forEach(a => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <div>
          <h4>${a.title}</h4>
          <div class="badges">
            <span class="badge ${clsStatus(a.status)}">${a.status}</span>
            <span class="badge ${clsPay(a.payment)}">${a.payment}</span>
            <span class="badge">${a.writer}</span>
            <span class="badge">${a.college||'College'}</span>
            <span class="badge">Due: ${a.deadline}</span>
          </div>
          <p class="muted">${a.desc}</p>
        </div>
        <div class="actions">
          ${a.status!=='Completed' ? `<button class="btn btn-sm" onclick="RFY.markProgress('${a.id}')">Mark Progress</button>`:''}
          ${a.payment!=='Fully Paid' && a.status==='Completed' ? `<button class="btn btn-sm" onclick="RFY.markPaid('${a.id}')">Pay Remaining</button>`:''}
        </div>`;
      listEl.appendChild(div);
    });
  }

  function markProgress(id){
    const list = store.get('rfy_assignments', []);
    const a = list.find(x=>x.id===id);
    if(!a) return;
    a.status = (a.status==='Pending'?'In Progress':'Completed');
    store.set('rfy_assignments', list);
    renderStudentStats(); renderStudentList(); renderWriter(); renderAdmin();
  }

  function markPaid(id){
    const list = store.get('rfy_assignments', []);
    const a = list.find(x=>x.id===id);
    if(!a) return;
    a.payment = 'Fully Paid';
    store.set('rfy_assignments', list);
    renderStudentStats(); renderStudentList(); renderWriter(); renderAdmin();
  }

  function clsStatus(s){ return s==='Pending'?'pending':(s==='In Progress'?'progress':'completed'); }
  function clsPay(p){ return p==='Half Paid'?'pay-half':'pay-full'; }

  // ---- Writer page ----
  function renderWriter(){
    const listEl = $('#writerList'); if(!listEl) return;
    const list = store.get('rfy_assignments', []);
    listEl.innerHTML = '';
    list.forEach(a=>{
      const duePay = (a.status==='Completed' && a.payment==='Half Paid') ? 'Yes' : 'No';
      const div = document.createElement('div');
      div.className='item';
      div.innerHTML = `
        <div>
          <h4>${a.title}</h4>
          <div class="badges">
            <span class="badge ${clsStatus(a.status)}">${a.status}</span>
            <span class="badge ${clsPay(a.payment)}">${a.payment}</span>
            <span class="badge">Student College: ${a.college||'-'}</span>
            <span class="badge">Writer: ${a.writer}</span>
            <span class="badge">Due: ${a.deadline}</span>
          </div>
          <p class="muted">${a.desc}</p>
        </div>
        <div class="actions">
          ${a.status!=='Completed' ? `<button class="btn btn-sm" onclick="RFY.markProgress('${a.id}')">Advance Status</button>`:''}
        </div>`;
      listEl.appendChild(div);
    });
    // writer stats
    const total = list.length;
    const progress = list.filter(x=>x.status==='In Progress').length;
    const completed = list.filter(x=>x.status==='Completed').length;
    const due = list.filter(x=>x.status==='Completed' && x.payment==='Half Paid').length;
    setText('w_total', total); setText('w_progress', progress); setText('w_completed', completed); setText('w_due', due);
  }

  // ---- Admin page ----
  function renderAdmin(){
    const listEl = $('#adminList'); if(!listEl) return;
    const q = ($('#f_search')?.value||'').toLowerCase();
    const fs = $('#f_status')?.value||'';
    const fp = $('#f_payment')?.value||'';
    const list = store.get('rfy_assignments', [])
      .filter(a => (a.title.toLowerCase().includes(q) || a.writer.toLowerCase().includes(q)))
      .filter(a => (fs? a.status===fs : true))
      .filter(a => (fp? a.payment===fp : true));

    listEl.innerHTML = '';
    list.forEach(a=>{
      const div = document.createElement('div');
      div.className='item';
      div.innerHTML = `
        <div>
          <h4>${a.title}</h4>
          <div class="badges">
            <span class="badge ${clsStatus(a.status)}">${a.status}</span>
            <span class="badge ${clsPay(a.payment)}">${a.payment}</span>
            <span class="badge">${a.writer}</span>
            <span class="badge">${a.college||'-'}</span>
            <span class="badge">Due: ${a.deadline}</span>
          </div>
          <p class="muted">${a.desc}</p>
        </div>
        <div class="actions"><span class="muted">Admin monitor only</span></div>`;
      listEl.appendChild(div);
    });

    // admin stats
    const all = store.get('rfy_assignments', []);
    setText('ad_total', all.length);
    setText('ad_pending', all.filter(x=>x.status==='Pending').length);
    setText('ad_progress', all.filter(x=>x.status==='In Progress').length);
    setText('ad_completed', all.filter(x=>x.status==='Completed').length);
  }

  function setText(id,val){ const el = document.getElementById(id); if(el) el.textContent = val; }

  // Public API
  return {
    signup,
    contactMessage,
    createAssignment,
    renderStudentList,
    renderWriter,
    renderAdmin,
    markProgress,
    markPaid,
    populateColleges,
    init(){
      seed();
      populateColleges();
      if(page==='student'){ renderStudentStats(); renderStudentList(); }
      if(page==='writer'){ renderWriter(); }
      if(page==='admin'){ renderAdmin(); }
    }
  };
})();

document.addEventListener('DOMContentLoaded', RFY.init);