//Alert banner

const alertBanner = document.getElementById('alert');

alertBanner.innerHTML = `<div class="alert-banner">
<p><strong>Alert:</strong>You have <strong>6</strong> overdue tasks to complete</p>
<p class="alert-banner-close">x</p>
</div>
`

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if(element.classList.contains('alert-banner-close')) {
        alertBanner.style.display = 'none'
    }
});

//Chart Widget

let trafficData = {
    labels: ["16-22", "23-29", "30-35", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"], 
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500], 
        backgroudnColor: 'rgba(116, 119, 191, 3)',
        borderWidth: 1,
    }]
}