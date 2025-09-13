from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import os, json, datetime

app = Flask(__name__)
app.secret_key = "supersecretkey"

USERS_DIR = "users"

# Утилита: загрузка пользователя
def load_user(username):
    path = os.path.join(USERS_DIR, f"{username}.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return None

# Утилита: сохранение пользователя
def save_user(userdata):
    path = os.path.join(USERS_DIR, f"{userdata['username']}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(userdata, f, ensure_ascii=False, indent=4)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/catalog")
def catalog():
    users = []
    for file in os.listdir(USERS_DIR):
        if file.endswith(".json"):
            with open(os.path.join(USERS_DIR, file), "r", encoding="utf-8") as f:
                users.append(json.load(f))
    return render_template("catalog.html", users=users)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        name = request.form["name"]
        school = request.form["school"]
        user = {
            "username": username,
            "password": password,
            "name": name,
            "school": school,
            "skills_offer": [],
            "skills_learn": [],
            "points": 200,
            "notifications": []
        }
        save_user(user)
        return redirect(url_for("login"))
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = load_user(username)
        if user and user["password"] == password:
            session["user"] = username
            return redirect(url_for("dashboard"))
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    if "user" not in session:
        return redirect(url_for("login"))
    user = load_user(session["user"])
    return render_template("dashboard.html", user=user)

if __name__ == "__main__":
    app.run(debug=True)
