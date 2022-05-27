import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { makeAutoObservable, runInAction } from 'mobx'
import { Comment } from '../models/comment'
import { store } from './store'

export default class CommentStore {
  comments: Comment[] = []
  hubConnection: HubConnection | null = null

  constructor() {
    makeAutoObservable(this)
  }

  createHubConnection = (activityId: string) => {
    if (store.acitivityStore.selectedActivity) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5000/chat?activityId=' + activityId, {
          accessTokenFactory: () => store.userStore.user?.token!,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build()

      this.hubConnection.start().catch((error:any) => console.log('Error establishing the connection: ', error))

      this.hubConnection.on('LoadComments', (comments: Comment[]) => {
        runInAction(() => {
          comments.forEach((comment) => {
            comment.createdAt = new Date(comment.createdAt + 'Z')
          })
          this.comments = comments
        })
      })

      this.hubConnection.on('ReceiveComment', (comment: Comment) => {
        runInAction(() => {
          comment.createdAt = new Date(comment.createdAt)
          this.comments.unshift(comment)
        })
      })
    }
  }

  stopHubConnection = () => {
    this.hubConnection?.stop().catch((error: any) => console.log('Error stopping connection: ', error))
  }

  clearComments = () => {
    this.comments = []
    this.stopHubConnection()
  }

  addComment = async (values: any) => {
    values.activityId = store.acitivityStore.selectedActivity?.id
    try {
      await this.hubConnection?.invoke('SendComment', values)
    } catch (error) {
      console.log(error)
    }
  }
}
