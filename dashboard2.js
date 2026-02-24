window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".custom-navbar");

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});
const ctx = document.getElementById('lineChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
            label: 'Views',
            data: [50,150,300,100,400,300,250,300,400,900,600,800],
            borderColor: '#22c55e',
            backgroundColor: 'transparent',
            tension: 0.4
        }]
    },
    options: {
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: { ticks: { color: 'white' } },
            y: { ticks: { color: 'white' } }
        }
    }
});

const pie = document.getElementById('pieChart');

new Chart(pie, {
    type: 'doughnut',
    data: {
        labels: ['Villa','Hotel','Guest','Room'],
        datasets: [{
            data: [35,20,25,20],
            backgroundColor: [
                '#f59e0b',
                '#22c55e',
                '#a855f7',
                '#06b6d4'
            ]
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: { color: 'white' }
            }
        }
    }
});