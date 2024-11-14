FROM alpine:latest

RUN apk update && apk add python3 && apk add py3-pip

WORKDIR /app
COPY . /app/
RUN pip install -r requierements.txt
ENTRYPOINT [ "pytest" ]