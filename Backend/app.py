import pandas as pd
from flask import Flask, request, jsonify
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

# Load the consumption dataset
dataset = pd.read_csv('consumption_dataset_months.csv')

# Preprocess the dataset (assuming it contains columns: 'Product_ID', 'Time', 'Quantity')
# Add any necessary preprocessing steps here, such as converting date/time columns

# Train the model (assuming linear regression)
X = dataset[['Time']].values
y = dataset['Quantity'].values
model = LinearRegression()
model.fit(X, y)

@app.route('/predict', methods=['POST'])
def predict_quantity():
    # Get the request data
    data = request.get_json()
    product_id = data['product_id']
    days = data['days']
    
    # Find the latest entry for the given product ID
    latest_entry = dataset[dataset['Product_ID'] == product_id].tail(1)
    latest_time = latest_entry['Time'].values[0]
    
    # Calculate the future time
    future_time = latest_time + days
    
    # Predict the quantity for the future time
    future_quantity = model.predict([[future_time]])[0]
    
    # Create the response JSON
    response = {
        'product_id': product_id,
        'future_time': future_time,
        'future_quantity': future_quantity
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run()
