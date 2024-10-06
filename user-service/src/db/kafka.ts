import { Kafka, Producer, Consumer } from "kafkajs"

class KafkaController {
  private kafka: Kafka
  private producer: Producer
  private consumer: Consumer

  constructor(brokerList: string[], clientId: string, groupId: string) {
    this.kafka = new Kafka({
      clientId: clientId,
      brokers: brokerList, // List of Kafka brokers
    })

    // Initialize producer
    this.producer = this.kafka.producer()

    // Initialize consumer
    this.consumer = this.kafka.consumer({ groupId: groupId })
  }

  // Connect producer to Kafka
  public async connectProducer(): Promise<void> {
    try {
      await this.producer.connect()
      console.log("Kafka Producer connected successfully")
    } catch (error) {
      console.error("Error connecting producer:", error)
    }
  }

  // Connect consumer to Kafka
  public async connectConsumer(): Promise<void> {
    try {
      await this.consumer.connect()
      console.log("Kafka Consumer connected successfully")
    } catch (error) {
      console.error("Error connecting consumer:", error)
    }
  }

  // Produce a message to a specific Kafka topic
  public async sendMessage(topic: string, message: string): Promise<void> {
    try {
      await this.producer.send({
        topic: topic,
        messages: [{ value: message }],
      })
      console.log(`Message sent to topic ${topic}: ${message}`)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  // Subscribe to a Kafka topic and process incoming messages
  public async consumeMessages(
    topic: string,
    callback: (message: string) => void
  ): Promise<void> {
    try {
      await this.consumer.subscribe({ topic: topic, fromBeginning: true })

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const messageValue = message.value?.toString() || ""
          console.log(`Received message from topic ${topic}: ${messageValue}`)
          callback(messageValue) // Pass message to the callback
        },
      })
    } catch (error) {
      console.error("Error consuming messages:", error)
    }
  }

  // Disconnect producer from Kafka
  public async disconnectProducer(): Promise<void> {
    try {
      await this.producer.disconnect()
      console.log("Producer disconnected from Kafka")
    } catch (error) {
      console.error("Error disconnecting producer:", error)
    }
  }

  // Disconnect consumer from Kafka
  public async disconnectConsumer(): Promise<void> {
    try {
      await this.consumer.disconnect()
      console.log("Consumer disconnected from Kafka")
    } catch (error) {
      console.error("Error disconnecting consumer:", error)
    }
  }
}

// Example Kafka settings
const kafkaBrokers = ["kafka:9092"] // or your kafka broker addresses
const kafkaClientId = "my-app"
const kafkaGroupId = "my-group"

const kafkaController = new KafkaController(
  kafkaBrokers,
  kafkaClientId,
  kafkaGroupId
)

export default kafkaController
