import sqlite3

conn = sqlite3.connect("instance/cheqmate.db")
cursor = conn.cursor()

# Show tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print("Tables:", cursor.fetchall())

# Show user data
cursor.execute("SELECT * FROM user;")
rows = cursor.fetchall()
for row in rows:import sqlite3

conn = sqlite3.connect("instance/cheqmate.db")
cursor = conn.cursor()

# Show tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print("Tables:", cursor.fetchall())

# Get column names for user table
cursor.execute("PRAGMA table_info(user);")
columns = [col[1] for col in cursor.fetchall()]
print("User table columns:", columns)

# Show all users
cursor.execute("SELECT * FROM user;")
rows = cursor.fetchall()

for row in rows:
    user_data = dict(zip(columns, row))
    print(user_data)

conn.close()

print(row)

conn.close()
