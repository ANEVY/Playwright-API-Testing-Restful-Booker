pipeline{
    agent any
    stages{
        stage('Build'){
            steps{
                sh 'mvn clean install'
                echo "Build completed"
            }
        }
        stage('Test'){
            steps{
                sh 'mvn test'
                echo "Test completed"
            }
        }
    }
}