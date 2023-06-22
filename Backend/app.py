import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.compose import ColumnTransformer
from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app) 

# Load the consumption dataset
dataset_path = "consumption_dataset_months.csv"
df = pd.read_csv(dataset_path)

# Preprocess the dataset
df["Date"] = pd.to_datetime(df["Date"], format="%m/%d/%Y")
df["Date"] = df["Date"].astype('int64') // 10**9  # Convert dates to timestamps in seconds

# Feature columns
feature_columns = ["Date", "Product_ID", "Quantity_in_Stock", "Lead_Time_Days", "New_Model_Added", "Recall"]

# Encode categorical variables
categorical_columns = ["Product_ID"]
preprocessor = ColumnTransformer(
    transformers=[
        ("encoder", OneHotEncoder(), categorical_columns)
    ],
    remainder="passthrough"
)
df_encoded = preprocessor.fit_transform(df[feature_columns])

# Dictionary to store models for each product ID
product_models = {}

# Train a separate model for each product ID
for product_id in df["Product_ID"].unique():
    product_df = df[df["Product_ID"] == product_id]
    product_X = preprocessor.transform(product_df[feature_columns])
    product_y = product_df["Quantity_Consumed"]
    product_model = LinearRegression()
    product_model.fit(product_X, product_y)
    product_models[product_id] = product_model

@app.route("/predict_needed_quantity", methods=["POST"])
def predict_needed_quantity():
    # Get the request data
    data = request.get_json()
    prediction_date = pd.to_datetime(data["date"], format="%m/%d/%Y")
    current_date = pd.Timestamp.now().normalize()
    days_elapsed = (prediction_date - current_date).days
    product_id = data["product_id"]

    if product_id not in product_models:
        return jsonify({"message": "Invalid product ID"})

    product_model = product_models[product_id]

    # Prepare the input data for prediction
    input_data = pd.DataFrame({
        "Date": [current_date.timestamp()],
        "Product_ID": [product_id],
        "Quantity_in_Stock": [0],
        "Lead_Time_Days": [0],
        "New_Model_Added": [0],
        "Recall": [0]
    })

    # Encode the input data
    input_encoded = preprocessor.transform(input_data)

    # Make the prediction
    prediction = product_model.predict(input_encoded)[0]
    prediction = max(0, int(prediction * days_elapsed))  # Multiply by days_elapsed and convert to integer

    # Return the prediction as the API response
    response = {
        "prediction": prediction
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
