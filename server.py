from flask import Flask, render_template, url_for, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('home_page.html')


@app.route('/lets-play', methods=['POST', 'GET'])
def game_page():
    player1 = request.args.get('player1')
    player2 = request.args.get('player2')
    if not player1:
        player1 = 'Player 1'
    if not player2:
        player2 = 'Player 2'

    return render_template('game_page.html', player1=player1, player2=player2)


if __name__ == '__main__':
    app.run(debug=True)