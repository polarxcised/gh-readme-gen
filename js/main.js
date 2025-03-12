const includeRepoStars = document.getElementById('includeRepoStars');
const repoInputDiv = document.getElementById('repoInputDiv');
includeRepoStars.addEventListener('change', () => {
  if (includeRepoStars.checked) {
    repoInputDiv.classList.remove('hidden');
  } else {
    repoInputDiv.classList.add('hidden');
  }
});

const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', () => {
  const markdownText = document.getElementById('codeBlock').textContent.trim();
  navigator.clipboard.writeText(markdownText).then(() => {
    copyBtn.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
    setTimeout(() => {
      copyBtn.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy Markdown to Clipboard';
    }, 2000);
  });
});
