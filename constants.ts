import { Concept } from './types';

export const CONCEPTS: Concept[] = [
  {
    id: 'llm',
    title: 'LLM',
    shortDefinition: 'Large Language Models trained on vast datasets to understand, generate, and manipulate human language.',
    example: 'Like ChatGPT writing an email for you based on a few bullet points.',
    uses: ['Chatbots', 'Content Creation', 'Summarization'],
    category: 'Foundation',
    iconName: 'Brain',
    color: 'blue'
  },
  {
    id: 'transformers',
    title: 'Transformers',
    shortDefinition: 'Neural network architecture using "self-attention" to process input data in parallel, enabling modern LLMs.',
    example: 'Reading a whole sentence at once to understand context, rather than word-by-word.',
    uses: ['GPT-4', 'BERT', 'Translation'],
    category: 'Architecture',
    iconName: 'Network',
    color: 'indigo'
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    shortDefinition: 'The art of structuring inputs (prompts) to guide the model towards the most accurate and relevant outputs.',
    example: 'Changing "Write code" to "Act as a senior Python developer and write optimized code".',
    uses: ['Optimization', 'Consistency', 'Role-play'],
    category: 'Technique',
    iconName: 'Terminal',
    color: 'emerald'
  },
  {
    id: 'fine-tuning',
    title: 'Fine-tuning',
    shortDefinition: 'Retraining a pre-trained model on a smaller, specific dataset to specialize it for a particular task or domain.',
    example: 'Training a general AI on medical records so it learns to diagnose like a doctor.',
    uses: ['Medical AI', 'Legal Bots', 'Brand Voice'],
    category: 'Technique',
    iconName: 'Settings2',
    color: 'cyan'
  },
  {
    id: 'embeddings',
    title: 'Embeddings',
    shortDefinition: 'Numerical vector representations of text where similar meanings are closer together in multi-dimensional space.',
    example: 'In math space: "King" - "Man" + "Woman" ≈ "Queen".',
    uses: ['Semantic Search', 'Recommendations', 'Clustering'],
    category: 'Architecture',
    iconName: 'ScatterChart',
    color: 'violet'
  },
  {
    id: 'rag',
    title: 'RAG',
    shortDefinition: 'Retrieval-Augmented Generation. Connecting LLMs to external data sources to improve accuracy.',
    example: 'A chatbot looking up your specific company policy PDF to answer a question.',
    uses: ['Enterprise Search', 'Support Bots', 'Fact Checking'],
    category: 'Advanced',
    iconName: 'DatabaseZap',
    color: 'orange'
  },
  {
    id: 'tokens',
    title: 'Tokens',
    shortDefinition: 'The basic units of text (words, sub-words, or characters) that models process.',
    example: 'The word "hamburger" might be 3 tokens: "ham", "bur", "ger".',
    uses: ['Billing', 'Context Limits', 'Processing'],
    category: 'Foundation',
    iconName: 'Puzzle',
    color: 'pink'
  },
  {
    id: 'mcp',
    title: 'MCP',
    shortDefinition: 'Model Context Protocol. A standard to unify how AI models connect to data, tools, and environments.',
    example: 'A universal plug letting Claude read your local files safely without custom code.',
    uses: ['IDE Integration', 'Data Pipelines', 'Tooling'],
    category: 'Advanced',
    iconName: 'Cable',
    color: 'fuchsia'
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    shortDefinition: 'Autonomous systems that use LLMs as a "brain" to plan, reason, and execute multi-step tasks.',
    example: 'An AI that not only suggests a hotel but goes to the website and books it for you.',
    uses: ['Automation', 'Research', 'Personal Assistants'],
    category: 'Advanced',
    iconName: 'Bot',
    color: 'teal'
  },
  {
    id: 'hallucination',
    title: 'Hallucination',
    shortDefinition: 'When an LLM generates factually incorrect, nonsensical, or unfaithful information with high confidence.',
    example: 'An AI confidently stating that "Elon Musk founded Google in 1995".',
    uses: ['Risk Management', 'Verification', 'Safety'],
    category: 'Risk',
    iconName: 'Ghost',
    color: 'red'
  },
  {
    id: 'chain-of-thought',
    title: 'Chain-of-Thought',
    shortDefinition: 'A technique prompting the model to explain its reasoning steps ("Think step-by-step") before answering.',
    example: 'Asking the AI to "Show your work" on a math problem to reduce errors.',
    uses: ['Math', 'Logic Puzzles', 'Complex Reasoning'],
    category: 'Technique',
    iconName: 'ListEnd',
    color: 'lime'
  },
  {
    id: 'zero-shot',
    title: 'Zero-shot',
    shortDefinition: 'The ability of a model to perform a task it hasn\'t explicitly been trained on, without examples.',
    example: 'Asking a model to translate English to Emojis without showing it how first.',
    uses: ['General Tasks', 'Translation', 'Classification'],
    category: 'Technique',
    iconName: 'Zap',
    color: 'yellow'
  },
  {
    id: 'context-window',
    title: 'Context Window',
    shortDefinition: 'The limit on the amount of text (in tokens) the model can consider at one time (input + output).',
    example: 'Being able to paste a whole book (100k tokens) vs just one chapter.',
    uses: ['Code Analysis', 'Book Summaries', 'Long History'],
    category: 'Parameter',
    iconName: 'Maximize',
    color: 'sky'
  },
  {
    id: 'temperature',
    title: 'Temperature',
    shortDefinition: 'A parameter controlling randomness. High = creative; Low = focused.',
    example: 'Setting 0.2 for a factual report, but 0.9 for writing a poem.',
    uses: ['Coding (Low)', 'Creative Writing (High)', 'Brainstorming'],
    category: 'Parameter',
    iconName: 'Thermometer',
    color: 'rose'
  }
];
