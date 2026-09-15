import React from 'react';
import { Video, Calendar, Clock, ExternalLink } from 'lucide-react';
import type { LiveClass } from '../../types';

interface LiveClassCardProps {
  liveClass: LiveClass;
}

export const LiveClassCard: React.FC<LiveClassCardProps> = ({ liveClass }) => {
  return (
    <div className="bg-white border border-jadmaa-border rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-jadmaa-red animate-pulse">
          <span className="w-2 h-2 rounded-full bg-jadmaa-red"></span>
          <span>Upcoming Live Interactive Session</span>
        </span>
        <span className="text-xs text-gray-400 font-mono">Google Meet</span>
      </div>

      <div>
        <h4 className="font-heading font-extrabold text-base text-jadmaa-charcoal">
          {liveClass.title}
        </h4>
        <p className="text-xs text-jadmaa-textMuted mt-1">
          Course: <span className="font-semibold text-jadmaa-charcoal">{liveClass.courseTitle}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs text-jadmaa-charcoal bg-jadmaa-cream/60 p-3 rounded-lg border border-jadmaa-border">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-jadmaa-red" />
          <div>
            <p className="text-[10px] text-gray-400">Scheduled</p>
            <p className="font-bold">{liveClass.scheduledTime}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-jadmaa-red" />
          <div>
            <p className="text-[10px] text-gray-400">Instructor</p>
            <p className="font-bold">{liveClass.instructorName}</p>
          </div>
        </div>
      </div>

      <div className="pt-1 flex items-center justify-between">
        <a
          href={liveClass.meetUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-jadmaa-red hover:bg-jadmaa-redDark text-white text-xs font-bold rounded-lg shadow transition-all"
        >
          <Video className="w-4 h-4" />
          <span>Join Live Class (Google Meet)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
