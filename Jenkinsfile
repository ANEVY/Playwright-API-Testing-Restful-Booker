pipeline{
    agent any
    environment{
        CI = 'true'
    }
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
        stage('Notify'){
            environment{
                TEST = 'true'
            }
            steps{
                sh 'printenv'
                
                echo "Notify completed"
            }
        }
    }
}