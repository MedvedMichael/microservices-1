kubectl delete ingress demo-ingress
kubectl delete service client-service service1-service service2-service root-service-service zookeeper kafka demo-storage postgres
kubectl delete deployment --all

kubectl delete service service1-service service2-service root-service-service
kubectl delete deployment service1-deployment service2-deployment root-service-deployment

