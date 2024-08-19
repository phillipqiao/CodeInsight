import pandas as pd

# THIS FILE IS ONLY INTERESTING TO THE ONE RESPONSIBLE FOR THE DATABASE, IGNORE THIS 

# pip install pandas
# python.exe -m pip install --upgrade pip
# python generate_sql.py

# Load the CSV file
csv_file_path = 'unitTests2.csv'  # Replace with the actual path to your CSV file
csv_data = pd.read_csv(csv_file_path)

# Clean up the column names
csv_data.columns = csv_data.columns.str.strip()

# Generate the SQL insert statements
insert_statements = []
for index, row in csv_data.iterrows():
    val = row['val'].replace("'", "''")  # Escape single quotes in the value
    insert_statements.append(f"({row['id']}, '{val}')")

# Join all the statements into a single string
insert_statements_sql = "INSERT INTO testBank (id, val) VALUES \n" + ",\n".join(insert_statements) + ";"
print(insert_statements_sql)
