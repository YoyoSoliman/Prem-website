# Yehia Soliman
# 5.3.2024
# This is just the start of the backend and has some of the important graphs used in player analysis

import pandas as pd
import matplotlib.pyplot as plt
from flask import Flask, jsonify, send_file
import io

app = Flask(__name__)

# Load player data from CSV file
def load_data(file_path):
    try:
        df = pd.read_csv(file_path)
        df['Player'] = df['Player'].astype(str)  # Ensure 'Player' column is string type
        return df
    except Exception as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame()  # Return empty DataFrame in case of error

# Create a scatter plot and return the plot as an image
def create_plot(x, y):
    df[x] = pd.to_numeric(df[x], errors='coerce')
    df[y] = pd.to_numeric(df[y], errors='coerce')
    
    df_sorted_y = df.sort_values(by=x, ascending=False)
    df_sorted_y_20 = df_sorted_y.head(20)

    plt.figure(figsize=(10, 6))
    plt.scatter(df_sorted_y_20[x], df_sorted_y_20[y])

    for i, row in df_sorted_y_20.iterrows():
        plt.text(row[x], row[y], row['Player'], ha='center', va='bottom', fontsize=7)

    plt.xlabel(x)
    plt.ylabel(y)
    
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    return img

df = load_data("C:/Users/yehia/prem-website/src/backend/PlayerStats.csv")

@app.route('/api/players', methods=['GET'])
def get_players():
    players_names = df['Player'].tolist()
    return jsonify(players_names)

@app.route('/api/plot/<x>/<y>', methods=['GET'])
def get_plot(x, y):
    img = create_plot(x, y)
    return send_file(img, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
