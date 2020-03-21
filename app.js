//***************************** */
//On Page Load Events
//****************************** */
const api = ` https://randomuser.me/api/?nat=gb&results=8`;
window.addEventListener("load", async () => {
  try {
    //*****Since the api was shutdown, I created a temporary data.js file instead.*****
    // const response = await fetch(api);
    // const responseJson = await response.json();

    //Generating users on the members and recent members sections
    const profiles = getProfiles(results);
    generateMembers(profiles);
    generateRecentMembers(profiles);
    //This autocomplete will generate on the message section
    const userNames = profiles.map(user => `${user.first} ${user.last}`);
    autocomplete(document.getElementById("userField"), userNames);
  } catch (err) {
    document.write("Something went wrong");
    console.log(err);
  }
});


//***************************** */
//ALERT BANNER
//****************************** */

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
// Members Section
//************************** */

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
  const date = formatDate(profile.dob.date);

  return {
    first,
    last,
    email,
    thumbnail,
    date
  };
};

const generateMembers = profiles => {
  const members = document.querySelector(".members-section");
  profiles.forEach((profile, index) => {
    if (index < profiles.length / 2) {
      const { first, last, email, date } = profile;
      const membersContainer = document.createElement("div");
      membersContainer.className += "members-container";
      members.appendChild(membersContainer);
      membersContainer.innerHTML = `
                              <img src="./images/member-${index +
                                1}.jpg" alt="" class="profile-image">
                              <div class="member-info">
                                <div class="members-text">
                                  <p>${first} ${last}</p>
                                  <p>
                                  <a href="#">${email}</a></p>
                                </div>
                              </div>
                              <p class="date">${date}</p>`;
    }
  });
};

const generateRecentMembers = profiles => {
  const recent = document.querySelector(".recent-activity");
  const recentProfiles = profiles.slice(profiles.length / 2);
  const time = [2, 4, 6, 1];
  const status = [
    "updated  profile image",
    "liked the post about Madonna",
    "commented facebook changes for 2019",
    "posted youre' best TIPS for SEO"
  ];
  recentProfiles.forEach((profile, i) => {
    const { first, last } = profile;
    const membersContainer = document.createElement("div");
    membersContainer.className += "members-container";
    recent.appendChild(membersContainer);
    membersContainer.innerHTML = `
                                <img src="./images/member-${i +
                                  1}.jpg" alt="" class="profile-image">
                                <div class="member-info">
                                  <div class="recent-text">
                                    <p>${first} ${last} ${status[i]}</p>
                                    <p>${time[i]} hour ago</p>
                                  </div>
                                </div>
                                <p class="read-more">></p>`;
  });
};

function formatDate(date) {
  const newDate = new Date(date);
  const newEvent = newDate.toLocaleDateString("en-US");
  return newEvent;
}

//****************************
//MESSAGE SECTION
//************************** */

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
      messageAlert.style.display = "block";
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
    }, 2500);
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
// Autocomplete
//************************** */

//These autocomplete functions was taken from: https://www.w3schools.com/howto/howto_js_autocomplete.asp
function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener("input", function() {
    let a,
      b,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

        b.addEventListener("click", function(e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function(e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;

      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;

      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;

    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;

    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    const x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}

//****************************
// Settings
//************************** */
const checkbox = document.querySelector(" input[class=email-settings]");

checkbox.addEventListener("change", function() {
  console.log(checkbox.innerHTML);
  // if (this.checked) {
  //   localStorage.setItem('email', 'checked');
  //   console.log(localStorage.getItem('email'));
  // } else {
  //   localStorage.email = '';
  //   console.log(localStorage.getItem("email"));
  // }
});

const buttonDisabled = document.querySelector(".button-disabled");
buttonDisabled.addEventListener("click", () => {
  localStorage.clear();
});

const buttonSave = document.querySelector("#save");
buttonSave.addEventListener("click", () => {
  const checkbox = document.querySelector(" input[class=email-settings]");
  localStorage.setItem("email", checkbox.innerHtml);
});
