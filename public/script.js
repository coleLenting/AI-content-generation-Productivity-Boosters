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

        async function callAI(prompt) {
            try {
                showLoading(true);
                
                // Simulate API call with timeout
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // This is a simulation - in a real app you would call your backend API
                const responses = {
                    email: `Subject: Follow Up on Project Timeline\n\nDear [Recipient],\n\nI hope this message finds you well. I'm writing to follow up on our recent discussion regarding the project timeline. As we mentioned, we're committed to delivering high-quality results and want to ensure we're aligned on the next steps.\n\nPlease let me know if you have any questions or need additional information.\n\nBest regards,\n[Your Name]`,
                    meeting: `Meeting Summary: Weekly Team Standup\n\nKey Points:\n- Reviewed current project timeline and milestones\n- Discussed resource allocation for upcoming tasks\n- John to finalize design mockups by EOD Wednesday\n- Next deadline set for Friday for phase 1 completion\n\nAction Items:\n1. John: Complete designs by Wednesday\n2. Team: Review designs by Thursday AM\n3. All: Prepare status updates for Friday's deadline`,
                    report: `Monthly Project Report - March 2023\n\nProject Status: On Track\nCompleted This Month:\n- Implemented user authentication system\n- Completed 85% of backend API development\n- Conducted 3 user testing sessions\n\nKey Metrics:\n- Budget Utilization: 65%\n- Tasks Completed: 42/50 (84%)\n- Bugs Resolved: 27\n\nNext Month Priorities:\n- Finalize mobile app UI\n- Conduct performance testing\n- Prepare for beta launch`,
                    social: `🚀 Remote Work Productivity Tips\n\nWorking remotely has changed how we collaborate. Here are 3 tips to boost your productivity:\n\n1️⃣ Designate a dedicated workspace\n2️⃣ Use time-blocking for focused work\n3️⃣ Take regular screen breaks\n\nWhat's your favorite productivity hack? Share below! 👇\n\n#RemoteWork #Productivity #WorkFromHome`
                };
                
                let result;
                if (prompt.includes('email')) result = responses.email;
                else if (prompt.includes('meeting')) result = responses.meeting;
                else if (prompt.includes('report')) result = responses.report;
                else result = responses.social;
                
                return result;
            } catch (error) {
                console.error('Error:', error);
                showStatus(`Error: ${error.message || 'Failed to generate content'}`, 'error');
                return null;
            } finally {
                showLoading(false);
            }
        }

        async function generateEmail() {
            const type = document.getElementById('emailType').value;
            const context = document.getElementById('emailContext').value;
            const tone = document.getElementById('emailTone').value;

            if (!context.trim()) {
                showStatus('Please provide context for the email', 'error');
                return;
            }

            const prompt = `Generate a ${tone} ${type} email with this context: ${context}. Make it professional and concise.`;
            const result = await callAI(prompt);
            
            if (result) {
                showResult(result);
            }
        }

        async function generateMeetingSummary() {
            const title = document.getElementById('meetingTitle').value;
            const notes = document.getElementById('meetingNotes').value;
            const style = document.getElementById('summaryStyle').value;

            if (!notes.trim()) {
                showStatus('Please provide meeting notes', 'error');
                return;
            }

            const prompt = `Create a ${style} meeting summary titled "${title}" from these notes: ${notes}. Format professionally.`;
            const result = await callAI(prompt);
            
            if (result) {
                showResult(result);
            }
        }

        async function generateReport() {
            const type = document.getElementById('reportType').value;
            const data = document.getElementById('reportData').value;
            const audience = document.getElementById('reportAudience').value;

            if (!data.trim()) {
                showStatus('Please provide report data', 'error');
                return;
            }

            const prompt = `Generate a ${type} report for ${audience} with this data: ${data}. Make it structured and professional.`;
            const result = await callAI(prompt);
            
            if (result) {
                showResult(result);
            }
        }

        async function generateSocialContent() {
            const platform = document.getElementById('socialPlatform').value;
            const content = document.getElementById('socialContent').value;
            const style = document.getElementById('socialStyle').value;

            if (!content.trim()) {
                showStatus('Please provide content topic', 'error');
                return;
            }

            const prompt = `Create a ${style} ${platform} post about: ${content}. Include relevant hashtags.`;
            const result = await callAI(prompt);
            
            if (result) {
                showResult(result);
            }
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