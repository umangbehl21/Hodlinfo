
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/api/top/results');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json(); 

                const tbody = document.getElementById('data-body');
                tbody.innerHTML = ''; 

                data.forEach((item, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${item.name}</td>
                        <td>₹ ${item.last}</td>
                        <td>₹ ${item.buy} / ₹ ${item.sell}</td>
                        <td>${item.volume}</td> <!-- Adjust this based on your requirements -->
                        <td>₹ ${item.volume}</td> <!-- Adjust this based on your requirements -->
                    `;
                    tbody.appendChild(row);
                });
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }

        window.onload = fetchData;
   