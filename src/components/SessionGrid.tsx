import { SessionInstance, SessionConfig } from '../types';
import { SessionCell } from './SessionCell';

interface SessionGridProps {
  sessions: SessionInstance[];
  config: SessionConfig;
}

export function SessionGrid({ sessions, config }: SessionGridProps) {
  return (
    <div 
      className="grid gap-6 justify-items-center"
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${300 * config.gridScale}px, 1fr))`,
      }}
    >
      {sessions.map((session) => (
        <SessionCell 
          key={session.id} 
          session={session} 
          config={config} 
        />
      ))}
    </div>
  );
}
