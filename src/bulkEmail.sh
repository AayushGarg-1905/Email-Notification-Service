#!/bin/bash

API_URL="http://localhost:4000/send-email"

TO="someone@example.com"

COUNT=50

for ((i = 1; i <= COUNT; i++)); do
  echo "Sending email #$i to $TO"

  RESPONSE=$(curl -s -X POST $API_URL \
    -H "Content-Type: application/json" \
    -d "{
      \"to\": \"$TO\",
      \"subject\": \"Test Email #$i\",
      \"text\": \"Hello, this is test email number $i.\"
    }")

  echo "Response: $RESPONSE"
  echo "" 
done