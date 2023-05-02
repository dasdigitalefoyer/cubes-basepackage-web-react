export class MqttService {
  constructor() {
    console.log('MqttService constructor called')
  }

  public connect(): void {
    console.log('Connected to broker')
  }

  public disconnect(): void {
    console.log('Disconnected from broker')
  }

  public subscribe(topic: string): void {
    console.log('Subscribed to topic: ' + topic)
  }

  public unsubscribe(topic: string): void {
    console.log('Unsubscribed from topic: ' + topic)
  }

  public publish(topic: string, message: string): void {
    console.log('Published to topic: ' + topic + ' with message: ' + message)
  }

  public onMessage(topic: string, message: string): void {
    console.log('Received message on topic: ' + topic + ' with message: ' + message)
  }
}
