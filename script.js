const connectBtn = document.querySelector("connect");


window.ethereum.enable();
let provider = new ethers.providers.Web3Provider(
    web3.currentProvider,
    "rinkeby"
);

let TodoContractAddress = "0xdC79Dd9c0230bb832E5fF9c1eAbe4569156FC121";
let TodoContractABI = [
	{
		"inputs": [],
		"name": "getTask",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_task",
				"type": "string"
			}
		],
		"name": "setTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];


let TodoContract;
let signer;

provider.listAccounts().then(function (accounts) {
    signer = provider.getSigner(accounts[0]);
    TodoContract = new ethers.Contract(
        TodoContractAddress,
        TodoContractABI,
        signer
    );
});


// const createTaskBtn = document.querySelector("createTask");
// const getTaskBtn = document.querySelector("fetchTask");




async function setTask() {
    let task = document.getElementById("task").value;

    if(task!=="") {
        setTaskPromise = TodoContract.setTask(task);
    }
    else {
        alert("Enter task first")
    }
    await setTaskPromise;
}

async function getTask() {
    let taskList = document.getElementById("task-list");
    const taskCompleted = document.createElement("button");
    
    taskCompleted.innerHTML = '<i class="bg-blue-500 text-white p-1 rounded">✔</i>';

    getTaskPromise = TodoContract.getTask();
    let Task = await getTaskPromise;

    const newTask = document.createElement("li");
    const addedTask = document.createTextNode(`${Task}`);
    newTask.appendChild(addedTask);
    
    document.getElementById("task-list").appendChild(newTask).appendChild(taskCompleted);
    
    console.log(Task);

    // delete function
    
    taskCompleted.addEventListener("click", function () {
        const completed = confirm("Are you sure you want to mark this task as completed!!!");

        if (completed == true) {
            const parent = this.parentNode;
            parent.remove();
        }
    })
    
}



// DOM selectors
const stars = document.getElementById('stars');
const starsCtx = stars.getContext('2d');
const slider = document.querySelector(".slider input");
const output = document.querySelector("#speed");

// global variables
let screen, starsElements, starsParams = { speed: 2, number: 300, extinction: 4 };

// run stars
setupStars();
updateStars();

// handle slider
output.innerHTML = slider.value;
slider.oninput = function () {
    output.innerHTML = this.value;
    starsParams.speed = this.value;
};

// update stars on resize to keep them centered
window.onresize = function () {
    setupStars();
};

// star constructor
function Star() {
    this.x = Math.random() * stars.width;
    this.y = Math.random() * stars.height;
    this.z = Math.random() * stars.width;

    this.move = function () {
        this.z -= starsParams.speed;
        if (this.z <= 0) {
            this.z = stars.width;
        }
    };

    this.show = function () {
        let x, y, rad, opacity;
        x = (this.x - screen.c[0]) * (stars.width / this.z);
        x = x + screen.c[0];
        y = (this.y - screen.c[1]) * (stars.width / this.z);
        y = y + screen.c[1];
        rad = stars.width / this.z;
        opacity = (rad > starsParams.extinction) ? 1.5 * (2 - rad / starsParams.extinction) : 1;

        starsCtx.beginPath();
        starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
        starsCtx.arc(x, y, rad, 0, Math.PI * 2);
        starsCtx.fill();
    }
}

// setup <canvas>, create all the starts
function setupStars() {
    screen = {
        w: window.innerWidth,
        h: window.innerHeight,
        c: [window.innerWidth * 0.5, window.innerHeight * 0.5]
    };
    window.cancelAnimationFrame(updateStars);
    stars.width = screen.w;
    stars.height = screen.h;
    starsElements = [];
    for (let i = 0; i < starsParams.number; i++) {
        starsElements[i] = new Star();
    }
}

// redraw the frame
function updateStars() {
    starsCtx.fillStyle = "black";
    starsCtx.fillRect(0, 0, stars.width, stars.height);
    starsElements.forEach(function (s) {
        s.show();
        s.move();
    });
    window.requestAnimationFrame(updateStars);
}