FROM openjdk:13.0.1
VOLUME /tmp
ADD ./target/a104-0.0.1-SNAPSHOT.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java","-jar","/app.jar"]