import { PacketHeader } from '../model/PacketHeader';

export interface PenaltyDTO {
  penaltyType: number;
  infringementType: number;
  vehicleIdx: number;
  otherVehicleIdx: number;
  time: number;
  lapNum: number;
  placesGained: number;
}

export interface SpeedTrapDTO {
  vehicleIdx: number;
  speed: number;
  overallFastestInSession: number;
  driverFastestInSession: number;
}

export interface DriveThroughPenaltyServedDTO {
  vehicleIdx: number;
}

export interface StopGoPenaltyServedDTO {
  vehicleIdx: number;
}

/*
    struct PacketEventData
    {
        PacketHeader    	m_header;               	// Header
        uint8           	m_eventStringCode[4];   	// Event string code, see below
        EventDataDetails	m_eventDetails;         	// Event details - should be interpreted differently
                                                     // for each type
    };
    */
export interface PacketEventData {
  m_header: PacketHeader;
  m_eventStringCode: string;
  Penalty?: PenaltyDTO;
  SpeedTrap?: SpeedTrapDTO;
  DriveThroughPenaltyServed?: DriveThroughPenaltyServedDTO;
  StopGoPenaltyServed?: StopGoPenaltyServedDTO;
}
