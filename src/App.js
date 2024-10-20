import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import SyncAPI from './api/sync.api';
import './App.css';
import { socket } from './socket'

function App() {
  const ISSUE_SYNC_SOCKET_EVENT = process.env.REACT_APP_SOCKET_EVENT;
  const [message, setmessage] = useState();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [syncEvent, setsyncEvent] = useState();

  const handleClick = async () => {
    syncMutation.mutate();
  }

  const syncMutation = useMutation(() => {
    return SyncAPI.syncIssues();
  })

  const { status, data, isSuccess } = syncMutation;

  useEffect(() => {
    if (status === 'success') {
      console.log("api success", data)
      setmessage(data?.message)
      const timeoutId = setTimeout(() => {
        setmessage();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [status, data])


  useEffect(() => {
    function onConnect() {
      console.log("Socket connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("Socket disconnected");
      setIsConnected(false);
    }

    function onSyncEvent(value) {
      console.log("Sync event received:", value);
      setsyncEvent(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on(ISSUE_SYNC_SOCKET_EVENT, onSyncEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off(ISSUE_SYNC_SOCKET_EVENT, onSyncEvent);
    };
  }, [ISSUE_SYNC_SOCKET_EVENT]);



  return (
    <div style={{ width: "100%", height: "100vh", alignContent: "center", background: "white", }}>
      <div className='main-body'>
        <div style={{ fontSize: "32px" }}>Start Issues Sync</div>
        <button className='button-style' onClick={() => handleClick()}>
          Sync Issues
        </button>
        <div style={{ color: "green", fontSize: "20px", fontWeight: 500 }} hidden={!message}>
          {message}
        </div>
        {
          isSuccess ?
            <div className='progress-body' >
              <div style={{ fontSize: "20px" }}>Job Id - {syncEvent?.jobId}</div>
              <div>|</div>
              <div style={{ fontSize: "20px" }}>Progress - {syncEvent?.progress || 0}%</div>
              <div>|</div>
              <div style={{ fontSize: "20px" }}>Status - {syncEvent?.message}</div>
            </div> : <></>
        }
        <div style={{ fontSize: "12px", color: isConnected ? "green" : "red" }}>Socket {isConnected ? "Connected" : "Offline"}</div>
      </div>
    </div>
  );
}

export default App;
