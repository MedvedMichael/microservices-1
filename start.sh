docker build -t client:0.1 -f client/Dockerfile .
docker build -t service1:0.1 -f services/service1/Dockerfile .
docker build -t service2:0.1 -f services/service2/Dockerfile .

kubectl apply -f k8s/service1/service1-deployment.yaml
kubectl apply -f k8s/service1/service1-service.yaml
kubectl apply -f k8s/service2/service2-deployment.yaml
kubectl apply -f k8s/service2/service2-service.yaml
kubectl apply -f k8s/client/client-deployment.yaml
kubectl apply -f k8s/client/client-service.yaml

kubectl apply -f k8s/ingress.yaml
