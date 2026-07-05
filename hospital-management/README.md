# Hospital Management System (Simple DevOps Learning Project)

## 1. Project Overview

This is a very simple, beginner-friendly End-to-End Hospital Management System.
It only implements **one module: Patient Management** (Add Patient, View All Patients).
No login, no authentication, no appointments, no billing.

The purpose of this project is to **learn DevOps** by seeing how a simple
full-stack app moves through: Docker → Jenkins → Kubernetes → Monitoring → Logging.

---

## 2. Folder Explanation

- **frontend/** – React app with a form to add patients and a table to list them.
- **backend/** – Spring Boot REST API (Java) with Patient entity, repository, service, controller.
- **database/** – MySQL init script and docker-compose file to run the DB.
- **kubernetes/** – YAML files to deploy the whole app on a Kubernetes cluster.
- **jenkins/** – A basic Jenkinsfile (Checkout → Maven Build → Docker Build).
- **monitoring/** – Prometheus config + a simple Grafana dashboard JSON.
- **logging/** – Filebeat + ELK (Elasticsearch, Logstash, Kibana) configs for log collection.

---

## 3. Technologies Used

- **Backend:** Java 17, Spring Boot, Spring Web, Spring Data JPA, MySQL, Maven
- **Frontend:** React (no routing library, no UI framework)
- **Database:** MySQL 8
- **Containers:** Docker, Docker Compose
- **CI/CD:** Jenkins
- **Orchestration:** Kubernetes
- **Monitoring:** Prometheus, Grafana
- **Logging:** Filebeat, Logstash, Elasticsearch, Kibana

---

## 4. API Endpoints

| Method | Endpoint     | Description               |
|--------|--------------|----------------------------|
| GET    | /patients    | Returns list of all patients (JSON) |
| POST   | /patients    | Adds a new patient (JSON body: name, age, gender) |

Example POST body:
```json
{
  "name": "Alice Brown",
  "age": 40,
  "gender": "Female"
}
```

---

## 5. Docker Commands

Run everything (MySQL + backend + frontend) using Docker Compose:

```bash
cd database
docker-compose up --build
```

Stop everything:
```bash
docker-compose down
```

Build individual images manually (optional):
```bash
docker build -t hospital-backend:latest ./backend
docker build -t hospital-frontend:latest ./frontend
```

---

## 6. Kubernetes Commands

Apply all Kubernetes resources in order:

```bash
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/mysql/deployment.yaml
kubectl apply -f kubernetes/mysql/service.yaml
kubectl apply -f kubernetes/backend/deployment.yaml
kubectl apply -f kubernetes/backend/service.yaml
kubectl apply -f kubernetes/frontend/deployment.yaml
kubectl apply -f kubernetes/frontend/service.yaml
kubectl apply -f kubernetes/ingress/ingress.yaml
```

Check status:
```bash
kubectl get all -n hospital-app
```

Delete everything:
```bash
kubectl delete namespace hospital-app
```

---

## 7. Jenkins Pipeline Explanation

The `jenkins/Jenkinsfile` has 3 simple stages:

1. **Git Checkout** – pulls the source code from the repository.
2. **Maven Build** – runs `mvn clean package` to build the backend jar.
3. **Build Docker Image** – builds a Docker image (`hospital-backend:latest`) from the backend.

This is intentionally simple — no tests, no deployment stage, no approvals.

---

## 8. How Monitoring Works

- **Prometheus** (`monitoring/prometheus.yml`) scrapes metrics from the backend
  every 15 seconds at `/actuator/prometheus`.
- **Grafana** (`monitoring/grafana/dashboard.json`) visualizes those metrics —
  showing backend uptime and HTTP request counts.

To use this in practice, you would add `spring-boot-starter-actuator` and
`micrometer-registry-prometheus` to the backend, then import the dashboard JSON into Grafana.

---

## 9. How Logging Works

- **Filebeat** (`logging/filebeat.yml`) reads backend log files and ships them to Logstash.
- **Logstash** (`logging/elk/logstash.conf`) receives logs and forwards them to Elasticsearch.
- **Elasticsearch** stores the logs.
- **Kibana** (`logging/elk/kibana.yml`) lets you search and visualize the logs in a browser.

Start the ELK stack:
```bash
cd logging/elk
docker-compose up --build
```

---

## 10. How to Run the Project (Simplest Way — Docker Compose)

1. Make sure Docker and Docker Compose are installed.
2. Open a terminal in the `hospital-management/database` folder.
3. Run:
   ```bash
   docker-compose up --build
   ```
4. Wait for all 3 containers (mysql-db, hospital-backend, hospital-frontend) to start.
5. Open your browser:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/patients

---

## 11. Expected Output

- The frontend page shows a title "Hospital Management System".
- A form lets you add a new patient (Name, Age, Gender).
- Below the form, a table lists all patients, starting with the 2 sample patients
  (John Doe, Jane Smith) already inserted by `init.sql`.
- Adding a patient through the form immediately updates the table.

---

## 12. Common Errors

- **"Could not connect to backend server"** in the frontend
  → Backend container is not running, or CORS is misconfigured.
- **"Unknown database 'hospital_db'"**
  → MySQL container did not run `init.sql` (check volume mount in docker-compose.yml).
- **Backend fails to start: "Communications link failure"**
  → Backend started before MySQL was ready. Wait a few seconds and restart the backend container.
- **Port already in use (3000, 8080, or 3306)**
  → Another process is using the port. Stop it or change the port mapping in docker-compose.yml.

---

## 13. Troubleshooting

- Check running containers: `docker ps`
- Check backend logs: `docker logs hospital-backend`
- Check MySQL logs: `docker logs mysql-db`
- Check frontend logs: `docker logs hospital-frontend`
- Restart everything cleanly:
  ```bash
  docker-compose down -v
  docker-compose up --build
  ```
- If Kubernetes pods are stuck in `Pending` or `CrashLoopBackOff`:
  ```bash
  kubectl describe pod <pod-name> -n hospital-app
  kubectl logs <pod-name> -n hospital-app
  ```
