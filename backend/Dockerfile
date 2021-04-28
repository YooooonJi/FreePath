FROM openjdk:13.0.1
VOLUME /tmp
RUN ./mvnw clean package
ADD ./target/FinalPJT_A104-0.0.1-SNAPSHOT.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080