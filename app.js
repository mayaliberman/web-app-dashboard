import { results } from './data';


//Alert banner

const alertBanner = document.getElementById("alert");

alertBanner.innerHTML = `<div class="alert-banner">
<p><strong>Alert:</strong>You have <strong>6</strong> overdue tasks to complete</p>
<p class="alert-banner-close">x</p>
</div>
`;

alertBanner.addEventListener("click", e => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none";
  }
});
//***************************** */
//CHART WIDEGTS
//****************************** */

//TRAFFIC CHART

const dataStatistic = [
   [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
   [250, 180, 900, 1500, 1100, 600, 2500, 2100, 2400, 1200, 900],
  [2500, 1000, 2200, 2600, 800, 400, 1000, 1500, 1000, 2000, 2000],
   [500, 2200, 1300, 600, 2020, 900, 400, 800, 2500, 2600, 1400]
];
const trafficCanvas = document.getElementById("traffic-chart");

let trafficData = {
  labels: [
    "16-22",
    "23-29",
    "30-35",
    "6-12",
    "13-19",
    "20-26",
    "27-3",
    "4-10",
    "11-17",
    "18-24",
    "25-31"
  ],
  datasets: [
    {
      data: dataStatistic[0],
      backgroundColor: "rgba(219,219,238, .7)",
      borderWidth: 2,
      lineTension: 0,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#7679c1",
      pointRadius: 4
    }
  ]
};

let trafficOptions = {
  aspectRatio: 2.5,
  animation: {
    duration: 1000
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  legend: {
    display: false
  }
};

let trafficChart = new Chart(trafficCanvas, {
  type: "line",
  data: trafficData,
  options: trafficOptions
});

function addData(chart, data) {
  chart.data.datasets.forEach(dataset => {
    dataset.data = data;
  });
  chart.update();
}

function removeData(chart) {
  chart.data.datasets.forEach(dataset => {
    dataset.data = [];
  });
  chart.render();
}


const listItems = document.querySelectorAll(".traffic-nav li");

for (let i = 0; i < listItems.length; i++) {
  listItems[i].addEventListener("click", function(e) {
    const current = document.querySelector(".active");
    current.className = e.target.className.replace(" active", "");
    this.className += " active";
    removeData(trafficChart);
    addData(trafficChart, dataStatistic[i]);
  });
}

//DAILY CHART

const dailyCanvas = document.getElementById("daily-chart");
const dailyData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      label: "# of Hits",
      data: [75, 115, 175, 125, 225, 200, 100],
      backgroundColor: "#7477bf",
      borderWidth: 1
    }
  ]
};

const dailyOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  legend: {
    display: false
  }
};

let dailyChart = new Chart(dailyCanvas, {
  type: "bar",
  data: dailyData,
  options: dailyOptions
});

//MOBILE CHART
const mobileCanvas = document.getElementById("mobile-chart");

const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [
    {
      label: "# of User",
      data: [2000, 550, 500],
      borderWidth: 0,
      backgroundColor: ["#7477bf", "#78cf82", "#51b6c8"]
    }
  ]
};

const mobileOptions = {
  legend: {
    position: "right",
    labels: {
      boxWidth: 20,
      fontStyle: "bold"
    }
  }
};

let mobileChart = new Chart(mobileCanvas, {
  type: "doughnut",
  data: mobileData,
  optoins: mobileOptions
});

//****************************
//Messeging Section
//******************** */

const send = document.getElementById("send");
send.addEventListener("click", e => {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const messageAlert = document.querySelector(".message p");
  const user = document.getElementById("userField");
  const message = document.getElementById("messageField");
  if (user.value.length < 1 && message.value.length < 1) {
    messageAlert.textContent = `Please fill out user and message fields before sending`;
    setTimeout(() => {
      messageAlert.textContent = "";
      messageAlert.style.display = 'block';
    }, 2500);
  } else if (user.value.length < 1) {
    messageAlert.textContent = "Plase fill out user field before sending";
    setTimeout(() => {
      messageAlert.textContent = "";
    }, 2500);
  } else if (message.value.length < 1) {
    messageAlert.textContent = "Please fill out message before sending";
    setTimeout(() => {
       messageAlert.textContent = "";
    }, 2500)
  } else if (user.value.length > 1 && message.value.length > 1) {
    messageAlert.style.color = "#7679c1";
    messageAlert.textContent = `Message successfully send to ${user.value}`;
    setTimeout(() => {
      messageAlert.textContent = "";
      messageAlert.style.color = "red";
      user.value = "";
      message.value = "";
    }, 3000);
  }

  if (user.value.length < 1 || message.value.length < 1) {
    return false;
  }
}


//****************************
// Members Section
//************************** */

// GET USERS JSON
// const apiAlternative = `https://fsjs-public-api-backup.herokuapp.com/api/`;
// const api =` https://randomuser.me/api/?nat=gb&results=8`
// window.addEventListener("load", async () => {
//   try {
//     const response = await fetch(apiAlternative);
//     const responseJson = await response.json();
//     const profiles = getProfiles(responseJson);
//     generateMembers(profiles);
//     generateRecentMembers(profiles);
//   } catch (err) {
//     document.write("Something went wrong");
//     console.log(err);
//   }
// });

const getProfiles = json => {
  const profileArr = [];
  json.results.forEach(person => {
    profileArr.push(getSingleProfile(person));
  });
  return profileArr;
};

const getSingleProfile = profile => {
  const { first, last } = profile.name;
  const thumbnail = profile.picture.thumbnail;
  const email = profile.email;
  const date = formatDate(profile.registered.date);

  return {
    first,
    last,
    email,
    thumbnail,
    date
  };
};

const generateMembers = profiles => {
  const members = document.querySelector(".members");
  profiles.forEach((profile, index) => {
    if (index < profiles.length / 2) {
      const { first, last, email, thumbnail, date } = profile;
      const membersContainer = document.createElement("div");
      membersContainer.className += "members-container";
      members.appendChild(membersContainer);
      membersContainer.innerHTML = `<img src=${thumbnail} alt="" class="profile-image">
                    <div class="members-text">
                        <p>${first} ${last}</p>
                        <a href="#">${email}</a>
                    </div>
                    <p>${date}</p>`;
    }
  });
};

const generateRecentMembers = profiles => {
  const recent = document.querySelector(".recent-activity");
  const recentProfiles = profiles.slice(profiles.length / 2);
  recentProfiles.forEach(profile => {
    const { first, last, email, thumbnail } = profile;
    const membersContainer = document.createElement("div");
    membersContainer.className += "members-container";
    recent.appendChild(membersContainer);
    membersContainer.innerHTML = `<img src="${thumbnail}" alt="" class="profile-image">
                    <div class="recent-text">
                        <p>${first} ${last}</p>
                        <a href="#">${email}</a>
                    </div>
                    <p class="read-more">></p>`;
  });
};

function formatDate(date) {
  const newDate = new Date(date);
  const newEvent = newDate.toLocaleDateString("en-US");
  return newEvent;
}
