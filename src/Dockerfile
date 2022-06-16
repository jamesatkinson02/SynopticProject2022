# use alpine linux
FROM alpine

# copy directory to ~/synoptic
COPY . ~/synoptic
WORKDIR ~/synoptic

# install golang
RUN apk add --update go

# get dependencies
RUN go mod init synoptic
RUN go mod tidy

# compile backend
RUN go build

# lets goooo
CMD ["./synoptic"]
