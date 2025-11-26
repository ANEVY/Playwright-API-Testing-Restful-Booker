pipeline{
    agent any
    stages{
        stage('Build'){
            steps{
                
                echo "Build completed"
            }
        }
        stage('Test'){
            steps{
              
                echo "Test completed"
            }
        }
        stage('Deploy'){
            steps{
                
                echo "Deploy completed"
            }
        }
        stage('Release'){
            steps{
                
                echo "Running release ${env.BUILD_NUMBER} on ${env.JENKINS_URL}"
            }
        }
    }
}