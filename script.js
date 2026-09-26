// Initialize Lucide Icons
lucide.createIcons();

// Interactive FEA/CFD HUD Simulation State Switcher
function setSimMode(mode) {
  const solverLabel = document.getElementById('current-solver');
  const flow1 = document.getElementById('sim-flow-1');
  const flow2 = document.getElementById('sim-flow-2');
  
  // Reset buttons
  document.querySelectorAll('.sim-tab-btn').forEach(btn => {
    btn.className = 'sim-tab-btn text-[10px] px-2.5 py-1 border border-slate-700 bg-slate-900 text-slate-400 hover:text-slate-200';
  });

  if (mode === 'cfd') {
    document.getElementById('btn-cfd').className = 'sim-tab-btn active text-[10px] px-2.5 py-1 border border-cyan-500 bg-cyan-500/20 text-cyan-300';
    solverLabel.textContent = 'SOLVER: ANSYS Fluent (CFD Velocity Vectors)';
    flow1.style.opacity = '0.85';
    flow2.style.opacity = '0';
  } else if (mode === 'fea') {
    document.getElementById('btn-fea').className = 'sim-tab-btn active text-[10px] px-2.5 py-1 border border-amber-500 bg-amber-500/20 text-amber-300';
    solverLabel.textContent = 'SOLVER: Abaqus Non-linear (von Mises Stress Contours)';
    flow1.style.opacity = '0';
    flow2.style.opacity = '0.9';
  } else if (mode === 'cad') {
    document.getElementById('btn-cad').className = 'sim-tab-btn active text-[10px] px-2.5 py-1 border border-emerald-500 bg-emerald-500/20 text-emerald-300';
    solverLabel.textContent = 'SOLVER: Parametric Wireframe Surface (SolidWorks/CATIA)';
    flow1.style.opacity = '0.1';
    flow2.style.opacity = '0.1';
  }
}

// Editable Photo Uploader Logic
function updateProfilePhoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('profile-photo').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
