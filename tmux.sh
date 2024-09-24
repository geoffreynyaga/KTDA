
#!/bin/bash

# Create a new tmux session with two vertical columns
tmux new-session -d -s dev_session

# Rename the first window
tmux rename-window -t dev_session:0 'Django'

# Split the first window horizontally to create two panes
tmux split-window -v -t dev_session:0

# Run Django server in the top pane (pane 0)
tmux send-keys -t dev_session:0.0 'source venv/bin/activate && python manage.py runserver 0.0.0.0:8000' C-m

# Run Tailwind in the bottom pane (pane 1)
tmux send-keys -t dev_session:0.1 'source venv/bin/activate && python manage.py tailwind start' C-m

# Create a second vertical column with one pane for UI development
tmux split-window -h -t dev_session:0

# Run the UI development server in the new column
tmux send-keys -t dev_session:0.2 'cd ui && pnpm run dev' C-m

# Balance the panes layout (two vertical columns)
tmux select-layout -t dev_session even-horizontal

# Attach to the session
tmux attach -t dev_session
