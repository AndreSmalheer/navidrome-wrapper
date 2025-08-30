# Use Python 3.11 slim
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first (for caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose Flask port
EXPOSE 5000

# Run Flask
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
