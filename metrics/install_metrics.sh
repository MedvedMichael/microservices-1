minikube addons enable metrics-server
kubectl top node
kubectl top pod
kubectl create namespace monitoring
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install --namespace monitoring prometheus prometheus-community/kube-prometheus-stack
sudo echo '192.168.39.76   grafana' >> /etc/hosts
kubectl config set-context --current --namespace=monitoring
kubectl apply -f grafana_ingress.yaml
kubectl get secret --namespace monitoring prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
kubectl port-forward --namespace monitoring service/prometheus-grafana 3000:80
#Then you should enter grafana in browser on 127.0.0.1:3000 and log in using password that was printed
