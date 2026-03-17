/**
 * GCC Playbook PWA — Main Application
 * ===================================
 * SPA with client-side routing, content rendering, and full-text search.
 */

let appData = null;
let allChapters = [];

// ============================================
// Data Loading
// ============================================
async function loadData() {
  try {
    const res = await fetch('/data/content.json');
    appData = await res.json();
    buildChapterIndex();
    return appData;
  } catch (e) {
    console.error('Failed to load content:', e);
    return null;
  }
}

function buildChapterIndex() {
  allChapters = [];
  const partKeys   = ['part1', 'part2', 'part3', 'appendices'];
  const partLabels = ['Part I', 'Part II', 'Part III', 'Appendices'];

  partKeys.forEach((key, pi) => {
    const part = appData.parts[key];
    if (!part || !part.chapters) return;
    part.chapters.forEach(ch => {
      allChapters.push({
        ...ch,
        partKey:   key,
        partLabel: partLabels[pi],
        partTitle: part.title,
        globalIndex: allChapters.length,
      });
    });
  });
}

// ============================================
// Rich Block Renderer
// ============================================
function renderBlocks(blocks) {
  if (!blocks || !blocks.length) return '';
  let html = '';
  let ulItems = [];

  function flushUl() {
    if (ulItems.length) {
      html += '<ul class="content-list">' +
        ulItems.map(i => `<li>${escapeHtml(i)}</li>`).join('') + '</ul>';
      ulItems = [];
    }
  }

  blocks.forEach(block => {
    if (block.type === 'ul') {
      // Already a pre-grouped list
      flushUl();
      if (block.items && block.items.length) {
        html += '<ul class="content-list">' +
          block.items.map(i => `<li>${escapeHtml(i)}</li>`).join('') + '</ul>';
      }
    } else if (block.type === 'h3') {
      flushUl();
      html += `<h3 class="block-h3">${escapeHtml(block.text)}</h3>`;
    } else {
      // 'p' type
      flushUl();
      const text = block.text || block;
      if (typeof text === 'string' && text.trim()) {
        html += `<p>${escapeHtml(text)}</p>`;
      }
    }
  });
  flushUl();
  return html;
}

// Backward compat: render legacy plain string content arrays
function renderContent(content) {
  if (!content || !content.length) return '';
  return content.map(item => {
    if (typeof item === 'string') return `<p>${escapeHtml(item)}</p>`;
    return renderBlocks([item]);
  }).join('');
}

// ============================================
// Router
// ============================================
let currentPage = 'home';
let currentChapterIdx = null;

function navigate(page, data = {}) {
  currentPage = page;
  currentChapterIdx = data.chapterIdx ?? null;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateActiveNav(page);
}

function updateActiveNav(page) {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.classList.toggle('active', el.dataset.nav === page);
  });
}

// ============================================
// Renderers
// ============================================
function render() {
  const main = document.getElementById('mainContent');
  
  switch (currentPage) {
    case 'home':
      main.innerHTML = renderHome();
      attachHomeEvents();
      break;
    case 'toc':
      main.innerHTML = renderTOC();
      attachTOCEvents();
      break;
    case 'chapter':
      main.innerHTML = renderChapter(currentChapterIdx);
      attachChapterEvents();
      break;
    case 'glossary':
      main.innerHTML = renderGlossary();
      attachGlossaryEvents();
      break;
    case 'search':
      main.innerHTML = renderSearch();
      attachSearchEvents();
      break;
    default:
      main.innerHTML = renderHome();
      attachHomeEvents();
  }
}

// ---- Home Page ----
function renderHome() {
  const stats = appData.stats;
  
  let partsHTML = '';
  const partConfigs = [
    { key: 'part1', cls: 'p1', label: 'I' },
    { key: 'part2', cls: 'p2', label: 'II' },
    { key: 'part3', cls: 'p3', label: 'III' },
    { key: 'appendices', cls: 'p1', label: 'A' },
  ];
  
  partConfigs.forEach(({ key, cls, label }) => {
    const part = appData.parts[key];
    if (!part || !part.chapters.length) return;
    
    const chaptersHTML = part.chapters.map((ch, i) => {
      const globalIdx = allChapters.findIndex(c => c.id === ch.id);
      const num = ch.number || ch.title.split(' ')[0];
      return `
        <div class="chapter-card" data-chapter-idx="${globalIdx}">
          <span class="chapter-num">${num.length > 6 ? '' : num}</span>
          <span class="chapter-title">${escapeHtml(ch.title.replace(/^\d+[\.\s]+/, '').substring(0, 80))}</span>
        </div>
      `;
    }).join('');
    
    partsHTML += `
      <div class="part-group fade-in">
        <div class="part-header">
          <div class="part-number ${cls}">${label}</div>
          <div class="part-info">
            <h3>${escapeHtml(part.title)}</h3>
            <p>${escapeHtml(part.subtitle)}</p>
          </div>
        </div>
        <div class="chapters-grid">${chaptersHTML}</div>
      </div>
    `;
  });
  
  return `
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">📕 Open Access · 2026–2030 Edition</div>
        <h1 class="hero-title">The Complete India <span class="accent">GCC Reference</span></h1>
        <p class="hero-subtitle">
          A comprehensive playbook covering India's Global Capability Centres — from landscape and maturity models to AI, deep tech, M&A, and 2030 scenarios.
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-value">${stats.totalChapters}</div>
            <div class="stat-label">Chapters</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">3</div>
            <div class="stat-label">Parts</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.glossaryTerms}</div>
            <div class="stat-label">Glossary Terms</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.references}</div>
            <div class="stat-label">References</div>
          </div>
        </div>
        <div class="hero-cta">
          <button class="btn btn-primary" data-nav="toc">Explore Contents</button>
          <button class="btn btn-secondary" data-nav="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Search
          </button>
        </div>
      </div>
    </section>
    
    <section class="parts-section">
      <div class="section-header">
        <div class="section-tag">PLAYBOOK CONTENTS</div>
        <h2 class="section-title">Three Parts, One Complete Reference</h2>
      </div>
      ${partsHTML}
    </section>
  `;
}

function attachHomeEvents() {
  document.querySelectorAll('.chapter-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.chapterIdx);
      if (!isNaN(idx)) navigate('chapter', { chapterIdx: idx });
    });
  });
  
  document.querySelectorAll('.hero-cta [data-nav]').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.nav));
  });
}

// ---- Chapter Page ----
function renderChapter(idx) {
  if (idx === null || idx >= allChapters.length) return renderHome();

  const ch = allChapters[idx];

  // Top-level chapter intro blocks
  const introHTML = renderBlocks(ch.blocks) || renderContent(ch.content);

  // Sections
  let sectionsHTML = '';
  if (ch.sections && ch.sections.length) {
    ch.sections.forEach(section => {
      const isKey     = section.isKeyTakeaway;
      const bodyHTML  = renderBlocks(section.blocks) || renderContent(section.content);

      let subsHTML = '';
      if (section.subsections && section.subsections.length) {
        subsHTML = section.subsections.map(sub => {
          const subBody = renderBlocks(sub.blocks) || renderContent(sub.content);
          return `<div class="subsection">
            <h3 class="sub-heading">${escapeHtml(sub.title)}</h3>
            ${subBody}
          </div>`;
        }).join('');
      }

      if (isKey) {
        sectionsHTML += `
          <div class="key-takeaway chapter-section">
            <h2>🎯 ${escapeHtml(section.title)}</h2>
            ${bodyHTML}${subsHTML}
          </div>`;
      } else {
        sectionsHTML += `
          <div class="chapter-section">
            <h2>${escapeHtml(section.title)}</h2>
            ${bodyHTML}${subsHTML}
          </div>`;
      }
    });
  }

  // Prev / next nav
  const prevCh = idx > 0 ? allChapters[idx - 1] : null;
  const nextCh = idx < allChapters.length - 1 ? allChapters[idx + 1] : null;

  const navHTML = `
    <div class="chapter-nav">
      ${prevCh ? `<div class="chapter-nav-btn prev" data-chapter-idx="${idx - 1}"><span class="label">← Previous</span><span class="title">${escapeHtml(prevCh.title.substring(0, 50))}</span></div>` : '<div></div>'}
      ${nextCh ? `<div class="chapter-nav-btn next" data-chapter-idx="${idx + 1}"><span class="label">Next →</span><span class="title">${escapeHtml(nextCh.title.substring(0, 50))}</span></div>` : '<div></div>'}
    </div>`;

  return `
    <article class="chapter-page fade-in">
      <div class="chapter-breadcrumb">
        <a href="#" data-nav="home">Home</a> ›
        <a href="#" data-nav="toc">${escapeHtml(ch.partLabel)}</a> ›
        <span>${escapeHtml(ch.title.substring(0, 50))}${ch.title.length > 50 ? '…' : ''}</span>
      </div>
      <div class="chapter-hero">
        <h1>${escapeHtml(ch.title)}</h1>
        <p style="color: var(--text-muted); font-size: 13px;">${escapeHtml(ch.partTitle)} · ${ch.sections ? ch.sections.length : 0} sections</p>
      </div>
      ${introHTML}
      ${sectionsHTML}
      ${navHTML}
    </article>`;
}

function attachChapterEvents() {
  document.querySelectorAll('.chapter-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.chapterIdx);
      if (!isNaN(idx)) navigate('chapter', { chapterIdx: idx });
    });
  });
  
  document.querySelectorAll('.chapter-breadcrumb [data-nav]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(a.dataset.nav);
    });
  });
}

// ---- TOC Page ----
function renderTOC() {
  const partConfigs = [
    { key: 'part1', cls: 'p1', label: 'Part I' },
    { key: 'part2', cls: 'p2', label: 'Part II' },
    { key: 'part3', cls: 'p3', label: 'Part III' },
    { key: 'appendices', cls: 'p1', label: 'Appendices' },
  ];
  
  let partsHTML = partConfigs.map(({ key, cls, label }) => {
    const part = appData.parts[key];
    if (!part || !part.chapters.length) return '';
    
    const items = part.chapters.map(ch => {
      const globalIdx = allChapters.findIndex(c => c.id === ch.id);
      const sectionCount = ch.sections ? ch.sections.length : 0;
      return `
        <div class="toc-chapter-item" data-chapter-idx="${globalIdx}">
          <div class="ch-title">${escapeHtml(ch.title)}</div>
          <div class="ch-sections">${sectionCount} sections</div>
        </div>
      `;
    }).join('');
    
    return `
      <div class="toc-part">
        <div class="toc-part-title open" data-toggle="${key}">
          <span class="arrow">▶</span>
          ${escapeHtml(part.title)}
          <span style="margin-left:auto; font-size:13px; color:var(--text-muted)">${part.chapters.length} chapters</span>
        </div>
        <div class="toc-chapters" id="toc-${key}">${items}</div>
      </div>
    `;
  }).join('');
  
  return `
    <div class="toc-page fade-in">
      <h1>Table of Contents</h1>
      ${partsHTML}
    </div>
  `;
}

function attachTOCEvents() {
  document.querySelectorAll('.toc-part-title').forEach(title => {
    title.addEventListener('click', () => {
      const key = title.dataset.toggle;
      const chapters = document.getElementById(`toc-${key}`);
      const isOpen = title.classList.contains('open');
      title.classList.toggle('open');
      chapters.style.display = isOpen ? 'none' : 'block';
    });
  });
  
  document.querySelectorAll('.toc-chapter-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.chapterIdx);
      if (!isNaN(idx)) navigate('chapter', { chapterIdx: idx });
    });
  });
}

// ---- Glossary Page ----
function renderGlossary() {
  const terms = appData.glossary || [];
  const termsHTML = terms.map(t => `
    <dl class="glossary-term" data-term="${escapeHtml(t.term.toLowerCase())}">
      <dt>${escapeHtml(t.term)}</dt>
      <dd>${escapeHtml(t.definition)}</dd>
    </dl>
  `).join('');
  
  return `
    <div class="glossary-page fade-in">
      <h1>Glossary</h1>
      <div class="glossary-search">
        <input type="text" id="glossarySearch" placeholder="Filter glossary terms…" autocomplete="off">
      </div>
      <div id="glossaryList">
        ${terms.length ? termsHTML : '<div class="empty-state"><p>No glossary terms available.</p></div>'}
      </div>
    </div>
  `;
}

function attachGlossaryEvents() {
  const input = document.getElementById('glossarySearch');
  if (!input) return;
  
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    document.querySelectorAll('.glossary-term').forEach(term => {
      const termText = term.dataset.term;
      term.style.display = (!query || termText.includes(query)) ? 'block' : 'none';
    });
  });
  
  input.focus();
}

// ---- Search Page ----
function renderSearch() {
  return `
    <div class="search-page fade-in">
      <h1>Search</h1>
      <div class="search-input-wrap">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" id="searchInput" placeholder="Search chapters, sections, content…" autocomplete="off">
      </div>
      <div id="searchResultsCount" class="search-results-count"></div>
      <div id="searchResults"></div>
    </div>
  `;
}

function attachSearchEvents() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  
  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => performSearch(input.value), 200);
  });
  
  input.focus();
}

function performSearch(query) {
  const resultsDiv = document.getElementById('searchResults');
  const countDiv = document.getElementById('searchResultsCount');
  
  if (!query || query.length < 2) {
    resultsDiv.innerHTML = '';
    countDiv.textContent = '';
    return;
  }
  
  const q = query.toLowerCase();
  const results = [];

  // Helper: get first text from blocks or content arrays
  function firstText(obj) {
    if (obj.blocks && obj.blocks.length) {
      const b = obj.blocks[0];
      return b.type === 'ul' ? (b.items?.[0] || '') : (b.text || '');
    }
    if (obj.content && obj.content.length) return obj.content[0];
    return '';
  }

  // Helper: search text within blocks and content
  function searchInBlocks(blocks, content) {
    const texts = [];
    if (blocks) blocks.forEach(b => {
      if (b.type === 'ul') b.items?.forEach(i => texts.push(i));
      else if (b.text) texts.push(b.text);
    });
    if (content) content.forEach(p => typeof p === 'string' && texts.push(p));
    return texts;
  }

  allChapters.forEach((ch, idx) => {
    // Search in chapter title
    if (ch.title.toLowerCase().includes(q)) {
      results.push({
        chapterIdx: idx,
        chapter:    ch.partLabel,
        title:      ch.title,
        excerpt:    firstText(ch),
        score:      10
      });
    }

    // Search in sections
    if (ch.sections) {
      ch.sections.forEach(section => {
        if (section.title.toLowerCase().includes(q)) {
          results.push({
            chapterIdx: idx,
            chapter:    ch.partLabel + ' · ' + ch.title.substring(0, 30),
            title:      section.title,
            excerpt:    firstText(section),
            score:      8
          });
        }

        // Search within block text / content text
        const texts = searchInBlocks(section.blocks, section.content);
        texts.forEach(p => {
          if (p.toLowerCase().includes(q)) {
            const i     = p.toLowerCase().indexOf(q);
            const start = Math.max(0, i - 60);
            const end   = Math.min(p.length, i + q.length + 60);
            results.push({
              chapterIdx: idx,
              chapter:    ch.partLabel + ' · ' + section.title.substring(0, 30),
              title:      ch.title,
              excerpt:    '…' + p.substring(start, end) + '…',
              score:      3
            });
          }
        });
      });
    }
  });
  
  // Also search glossary
  if (appData.glossary) {
    appData.glossary.forEach(term => {
      if (term.term.toLowerCase().includes(q) || term.definition.toLowerCase().includes(q)) {
        results.push({
          chapterIdx: null,
          chapter: 'Glossary',
          title: term.term,
          excerpt: term.definition,
          score: 5,
          isGlossary: true
        });
      }
    });
  }
  
  // Sort by score and deduplicate
  results.sort((a, b) => b.score - a.score);
  const unique = [];
  const seen = new Set();
  results.forEach(r => {
    const key = r.title + r.excerpt.substring(0, 30);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(r);
    }
  });
  
  const display = unique.slice(0, 30);
  countDiv.textContent = `${unique.length} result${unique.length !== 1 ? 's' : ''} found`;
  
  if (!display.length) {
    resultsDiv.innerHTML = '<div class="empty-state"><p>No results found. Try different keywords.</p></div>';
    return;
  }
  
  resultsDiv.innerHTML = display.map(r => {
    const highlighted = highlightText(r.excerpt, query);
    return `
      <div class="search-result" ${r.chapterIdx !== null ? `data-chapter-idx="${r.chapterIdx}"` : `data-nav="glossary"`}>
        <div class="result-chapter">${escapeHtml(r.chapter)}</div>
        <div class="result-title">${escapeHtml(r.title)}</div>
        <div class="result-excerpt">${highlighted}</div>
      </div>
    `;
  }).join('');
  
  // Attach click events
  resultsDiv.querySelectorAll('.search-result').forEach(el => {
    el.addEventListener('click', () => {
      const idx = el.dataset.chapterIdx;
      if (idx !== undefined && idx !== 'null') {
        navigate('chapter', { chapterIdx: parseInt(idx) });
      } else if (el.dataset.nav) {
        navigate(el.dataset.nav);
      }
    });
  });
}

function highlightText(text, query) {
  if (!text || !query) return escapeHtml(text || '');
  const escaped = escapeHtml(text);
  const re = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return escaped.replace(re, '<mark>$1</mark>');
}

// ============================================
// Utility
// ============================================
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================================
// Event Setup
// ============================================
function setupNavigation() {
  // Desktop nav
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const page = el.dataset.nav;
      navigate(page);
      closeMobileMenu();
    });
  });
  
  // Mobile menu
  const menuBtn = document.getElementById('mobileMenuBtn');
  const overlay = document.getElementById('mobileNavOverlay');
  
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      overlay.classList.toggle('open');
      menuBtn.classList.toggle('active');
    });
  }
}

function closeMobileMenu() {
  const overlay = document.getElementById('mobileNavOverlay');
  const menuBtn = document.getElementById('mobileMenuBtn');
  if (overlay) overlay.classList.remove('open');
  if (menuBtn) menuBtn.classList.remove('active');
}

// ============================================
// Service Worker Registration
// ============================================
async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered');
    } catch (e) {
      console.log('SW registration failed:', e);
    }
  }
}

// ============================================
// Init
// ============================================
async function init() {
  const main = document.getElementById('mainContent');
  main.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';
  
  await loadData();
  
  if (!appData) {
    main.innerHTML = '<div class="empty-state"><p>Failed to load content. Please try refreshing.</p></div>';
    return;
  }
  
  setupNavigation();
  navigate('home');
  registerSW();
}

document.addEventListener('DOMContentLoaded', init);
