// Model: Handles calculator data and logic
class CalculatorModel {
    constructor() {
        this.clear();
    }

    clear() {
        this.currentValue = "0";
        this.previousValue = null;
        this.operator = null;
        this.waitingForOperand = false;
    }

    inputNumber(number) {
        if (this.waitingForOperand) {
            this.currentValue = number;
            this.waitingForOperand = false;
        } else {
            if (number === "." && this.currentValue.includes(".")) return;
            if (this.currentValue === "0" && number !== ".") {
                this.currentValue = number;
            } else {
                this.currentValue += number;
            }
        }
    }

    setOperator(operator) {
        if (this.operator && !this.waitingForOperand) {
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.operator = operator;
        this.waitingForOperand = true;
    }

    calculate() {
        let result = 0;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        switch (this.operator) {
            case "add":
                result = prev + current;
                break;
            case "subtract":
                result = prev - current;
                break;
            case "multiply":
                result = prev * current;
                break;
            case "divide":
                result = current !== 0 ? prev / current : "Error";
                break;
            default:
                result = current;
        }
        this.currentValue = String(result).substring(0, 12);
        this.operator = null;
        this.previousValue = null;
        this.waitingForOperand = false;
    }

    getDisplay() {
        return this.currentValue;
    }
}

// View: Handles display and updates
class CalculatorView {
    constructor(displayElement) {
        this.displayElement = displayElement;
    }

    updateDisplay(value) {
        this.displayElement.textContent = value;
    }
}

// Controller: Connects Model and View, handles events
class CalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.view.updateDisplay(this.model.getDisplay());
        document.querySelector(".buttons").addEventListener("click", (e) => {
            const target = e.target;
            if (target.matches("button")) {
                if (target.dataset.number !== undefined) {
                    this.model.inputNumber(target.dataset.number);
                    this.view.updateDisplay(this.model.getDisplay());
                } else if (target.dataset.action !== undefined) {
                    this.handleAction(target.dataset.action);
                }
            }
        });
    }

    handleAction(action) {
        switch(action) {
            case "clear":
                this.model.clear();
                this.view.updateDisplay(this.model.getDisplay());
                break;
            case "add":
            case "subtract":
            case "multiply":
            case "divide":
                this.model.setOperator(action);
                break;
            case "equals":
                this.model.calculate();
                this.view.updateDisplay(this.model.getDisplay());
                break;
        }
    }
}

// Initialize everything when the page loads
window.onload = () => {
    const model = new CalculatorModel();
    const view = new CalculatorView(document.getElementById("display"));
    new CalculatorController(model, view);
};