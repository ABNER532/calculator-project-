import tkinter as tk
from tkinter import ttk

class Calculator(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Modern Calculator")
        self.geometry("320x450")
        self.resizable(False, False)
        self.configure(bg="#222831")

        self.expression = ""
        self.create_widgets()

    def create_widgets(self):
        style = ttk.Style()
        style.theme_use("clam")
        style.configure("TButton",
                        font=("Segoe UI", 16),
                        padding=10,
                        foreground="#222831",
                        background="#FFD369",
                        borderwidth=0)
        style.map("TButton",
                  background=[('active', '#FFD369'), ('!active', '#FFD369')],
                  foreground=[('active', '#222831')])

        self.entry = tk.Entry(self, font=("Segoe UI", 24), borderwidth=0, relief=tk.FLAT, justify="right",
                              bg="#393E46", fg="#FFD369")
        self.entry.insert(0, "0")
        self.entry.pack(fill="both", ipadx=8, ipady=22, padx=8, pady=(18, 8))

        btns_frame = tk.Frame(self, bg="#222831")
        btns_frame.pack()

        buttons = [
            ('C', '⌫', '%', '/'),
            ('7', '8', '9', '*'),
            ('4', '5', '6', '-'),
            ('1', '2', '3', '+'),
            ('00', '0', '.', '=')
        ]

        for row_values in buttons:
            row = tk.Frame(btns_frame, bg="#222831")
            row.pack(expand=True, fill="both")
            for btn_text in row_values:
                btn = ttk.Button(row, text=btn_text, command=lambda t=btn_text: self.on_button_click(t))
                btn.pack(side="left", expand=True, fill="both", padx=5, pady=5)

    def on_button_click(self, char):
        if char == "C":
            self.expression = ""
            self.entry.delete(0, tk.END)
            self.entry.insert(0, "0")
        elif char == "⌫":
            self.expression = self.expression[:-1]
            self.entry.delete(0, tk.END)
            self.entry.insert(0, self.expression if self.expression else "0")
        elif char == "=":
            try:
                result = str(eval(self.expression.replace('%', '/100')))
                self.entry.delete(0, tk.END)
                self.entry.insert(0, result)
                self.expression = result
            except Exception:
                self.entry.delete(0, tk.END)
                self.entry.insert(0, "Error")
                self.expression = ""
        else:
            if self.entry.get() == "0" or self.entry.get() == "Error":
                self.entry.delete(0, tk.END)
            self.expression += str(char)
            self.entry.delete(0, tk.END)
            self.entry.insert(0, self.expression)

if __name__ == "__main__":
    app = Calculator()
    app.mainloop()