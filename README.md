# Email Notification Service

A production-ready, scalable, and asynchronous email notification system built with Node.js, Kafka, BullMQ, Redis, and Docker.  

---

##  Features

- **RESTful API** for submitting email requests
- **Kafka** for high-throughput, decoupled message streaming
- **BullMQ** (with Redis) for reliable background job management and retries
- **Worker** for actual email delivery using Ethereal (via Nodemailer transport)
- **Rate Limiting** to protect the API from abuse and spikes
- **Docker Compose** for seamless local and cloud deployment
- **Bull Board UI** for real-time job monitoring and management
- **Bulk email testing script** for load simulation

---

##  Architecture

```
Client → HTTP API → Kafka Producer
         Kafka Consumer → BullMQ → Worker → Ethereal SMTP
```

- **API**: Receives email requests and publishes them to Kafka.
- **Kafka Consumer**: Reads messages from Kafka and enqueues them in BullMQ.
- **Worker**: Processes BullMQ jobs and sends emails via Ethereal.
- **Redis**: Backend for BullMQ.
- **Kafka & Zookeeper**: Message streaming backbone.

---

##  Tech Stack

- **Node.js** & **TypeScript**
- **Express** (API)
- **Kafka** 
- **BullMQ** & **Redis**
- **Nodemailer** with **Ethereal** for safe, inspectable email testing
- **Docker** & **Docker Compose**
- **Bull Board** for job monitoring

---

##  Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Ethereal Email](https://ethereal.email/) account (for SMTP credentials)

### Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/email-notification-service.git
   cd email-notification-service
   ```

2. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```
   PORT=4000
   KAFKA_BROKER=kafka:9092
   REDIS_HOST=redis
   REDIS_PORT=6379
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_USER=your_ethereal_user
   SMTP_PASS=your_ethereal_pass
   ```

   > You can generate Ethereal credentials at [https://ethereal.email/create](https://ethereal.email/create).

3. **Start all services**
   ```sh
   docker compose up --build
   ```

4. **Send a test email**
   ```sh
   curl -X POST http://localhost:4000/send-email \
     -H "Content-Type: application/json" \
     -d '{"to":"someone@example.com","subject":"Hello","text":"Test email"}'
   ```

---

##  Monitoring & Management

- **Bull Board UI**:  
  Visit [http://localhost:4000/admin/queues](http://localhost:4000/admin/queues) to monitor and manage BullMQ jobs in real time.

---

##  Bulk Testing

Use the provided script to simulate bulk email requests and test system throughput:
```sh
bash src/bulkEmail.sh
```

---

##  Rate Limiting

The API is protected by a rate limiter (default: 10 requests per minute per IP) to prevent abuse and ensure system stability.  
You can adjust this in [`src/utils/rateLimiter.ts`](src/utils/rateLimiter.ts).


