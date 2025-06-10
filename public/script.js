        function showStatus(message, type) {
            const statusEl = document.getElementById('statusMessage');
            statusEl.textContent = message;
            statusEl.className = `status-message status-${type}`;
            statusEl.style.display = 'flex';
            statusEl.style.alignItems = 'center';
            statusEl.style.gap = '0.5rem';
            
            setTimeout(() => {
                statusEl.style.display = 'none';
            }, 4000);
        }

        function showLoading(show) {
            document.getElementById('loading').style.display = show ? 'flex' : 'none';
            document.getElementById('loading').style.flexDirection = 'column';
            document.getElementById('loading').style.alignItems = 'center';
            if (show) {
                document.getElementById('resultArea').style.display = 'none';
            }
        }

        function showResult(content) {
            document.getElementById('resultContent').textContent = content;
            document.getElementById('resultArea').style.display = 'block';
            document.getElementById('loading').style.display = 'none';
            window.scrollBy(0, 400); // Smooth scroll to result
        }

        function resetForm() {
            document.getElementById('resultArea').style.display = 'none';
            showStatus('Ready to generate new content', 'success');
        }

        function copyToClipboard() {
            const content = document.getElementById('resultContent').textContent;
            navigator.clipboard.writeText(content).then(() => {
                showStatus('Content copied to clipboard!', 'success');
            }).catch(() => {
                showStatus('Failed to copy content', 'error');
            });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            showStatus('Ready to generate content', 'success');
            
            // Add subtle animation to cards on load
            const cards = document.querySelectorAll('.content-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 150 + (index * 100));
            });
        });