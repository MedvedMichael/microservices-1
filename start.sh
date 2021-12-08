#minikube start --driver=docker
eval $(minikube docker-env)
minikube addons enable ingress

docker build -t client:0.1 -f client/Dockerfile .
docker build -t service1:0.1 -f services/service1/Dockerfile .
docker build -t service2:0.1 -f services/service2/Dockerfile .
docker build -t root-service:0.1 -f services/root-service/Dockerfile .

kubectl apply -f k8s/service1
kubectl apply -f k8s/service2
kubectl apply -f k8s/root-service
kubectl apply -f k8s/client
kubectl apply -f k8s/zookeeper
kubectl apply -f k8s/kafka
kubectl apply -f k8s/demo-storage
kubectl apply -f k8s/postgres
kubectl apply -f k8s/vault

kubectl apply -f k8s/ingress.yaml
#sudo minikube tunnel

kubectl port-forward $(kubectl get pod -l app=vault -o jsonpath="{.items[0].metadata.name}") 8080:8080