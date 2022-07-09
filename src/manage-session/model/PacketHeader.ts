export interface PacketHeader {
  m_packetFormat: number; // 2022
  m_gameMajorVersion: number; // Game major version - "X.00"
  m_gameMinorVersion: number; // Game minor version - "1.XX"
  m_packetVersion: number; // Version of this packet type, all start from 1
  m_packetId: number; // Identifier for the packet type, see below
  m_sessionUID: string; // Unique identifier for the session
  m_sessionTime: number; // Session timestamp
  m_frameIdentifier: number; // Identifier for the frame the data was retrieved on
  m_playerCarIndex: number; // Index of player's car in the array
  m_secondaryPlayerCarIndex: number; // Index of secondary player's car in the array (splitscreen)
  // 255 if no second player
}
