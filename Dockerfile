#Using prebuilt application jar
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app 
# Create a non-root user to run the application
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy the pre-built jar file
COPY app.jar .

# Set ownership of the app files to the non-root user
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser 

ENTRYPOINT ["java", "-jar", "app.jar"] 


# FROM eclipse-temurin:17-jdk-jammy as mvn-build
# WORKDIR /app/build
# COPY ./src ./src
# COPY pom.xml .
# COPY .mvn .mvn
# COPY mvnw .
# RUN ./mvnw clean install -Dmaven.test.skip=true

# FROM eclipse-temurin:17-jre-jammy
# WORKDIR /app
# #COPY wait_for_config_server.sh .
# COPY --from=mvn-build /app/build/target/*.jar ./webui-bff.jar
# #RUN ["chmod","+x","/app/wait_for_config_server.sh"]
# #ENTRYPOINT ["/app/wait_for_config_server.sh"]
# ENTRYPOINT ["java", "-jar", "/app/webui-bff.jar"]
