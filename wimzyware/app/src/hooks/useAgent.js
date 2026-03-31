import { useState, useMemo } from 'react';
import { mockAgents } from '../data/mockAgents';
import { mockConversations } from '../data/mockConversations';

/**
 * Custom hook for managing agent state.
 * Future: Will integrate with aiService for real Bedrock calls.
 */
export function useAgent() {
  const [selectedAgentId, setSelectedAgentId] = useState(null);

  const agents = mockAgents;

  const selectedAgent = useMemo(
    () => agents.find(a => a.id === selectedAgentId) || null,
    [agents, selectedAgentId]
  );

  const conversation = useMemo(
    () => (selectedAgentId ? mockConversations[selectedAgentId] || [] : []),
    [selectedAgentId]
  );

  const selectAgent = (agentId) => {
    setSelectedAgentId(agentId);
  };

  return {
    agents,
    selectedAgent,
    selectedAgentId,
    selectAgent,
    conversation,
  };
}
