### Build the image
```
docker build . -t <your-image-name>
```
> **Exemple**
> *docker build . -t laudem/kafka-cortex-gateway:1.7*

### Run the container
```
docker run -d --network host --name kafka-cortex-gateway laudem/kafka-cortex-gateway:1.7
```
> **Exemple**
> *docker run -d --network host --name kafka-cortex-gateway laudem/kafka-cortex-gateway:1.7*

